const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: '.env.local' });
const path = require('path');
const prettier = require('prettier');
const fsExtra = require('fs-extra');
const contentfulManagement = require('contentful-management');

const outputPath = path.resolve(
  process.cwd(),
  '@types/generated/contentful.d.ts'
);

const {
  default: renderInterface,
} = require('contentful-typescript-codegen/dist/lib/renderers/typescript/renderInterface.js');
const {
  default: renderContentTypeId,
} = require('contentful-typescript-codegen/dist/lib/renderers/contentful/renderContentTypeId.js');
const {
  default: renderNamespace,
} = require('contentful-typescript-codegen/dist/lib/renderers/contentful/renderNamespace.js');
const {
  default: renderField,
} = require('contentful-typescript-codegen/dist/lib/renderers/contentful/renderField.js');
const {
  default: renderArray,
} = require('contentful-typescript-codegen/dist/lib/renderers/contentful/fields/renderArray.js');
const {
  default: renderBoolean,
} = require('contentful-typescript-codegen/dist/lib/renderers/contentful/fields/renderBoolean.js');
const {
  default: renderSymbol,
} = require('contentful-typescript-codegen/dist/lib/renderers/contentful/fields/renderSymbol.js');
const {
  default: renderNumber,
} = require('contentful-typescript-codegen/dist/lib/renderers/contentful/fields/renderNumber.js');
const {
  default: renderLink,
} = require('contentful-typescript-codegen/dist/lib/renderers/contentful/fields/renderLink.js');
const {
  default: renderLocation,
} = require('contentful-typescript-codegen/dist/lib/renderers/contentful/fields/renderLocation.js');
const {
  default: renderObject,
} = require('contentful-typescript-codegen/dist/lib/renderers/contentful/fields/renderObject.js');

const addStringField = (id) => ({
  id,
  name: id,
  type: 'Text',
  localized: false,
  required: true,
  validations: [],
  disabled: false,
  omitted: false,
});

const conversions = {
  link: {
    remove: ['entryLink', 'entryBlockLink'],
    required: ['href'],
  },
  ourPeople: {
    required: ['people'],
  },
  heroBlog: {
    required: ['blogArticles'],
  },
  blogArticle: {
    required: ['associatedBlogArticles'],
    stringArray: ['categories'],
  },
  caseStudy: {
    required: ['associatedCaseStudies'],
  },
};

function renderContentType(contentType) {
  const name = renderContentTypeId(contentType.sys.id);

  let cmsFields = contentType.fields.map((field) => {
    if (field.id === 'backgroundColor') {
      return {
        ...field,
        type: 'Symbol',
      };
    }
    return field;
  });

  // convert fields
  const conversion = conversions[contentType.sys.id];
  if (conversion) {
    if (conversion.remove) {
      cmsFields = cmsFields.filter(
        (field) => !conversion.remove.includes(field.id)
      );
    }
    if (conversion.required) {
      cmsFields = cmsFields.map((field) => {
        if (conversion.required.includes(field.id)) {
          return {
            ...field,
            required: true,
          };
        }
        return field;
      });
    }
    if (conversion.stringArray) {
      cmsFields = cmsFields.map((field) => {
        if (conversion.stringArray.includes(field.id)) {
          return {
            ...field,
            type: 'Array',
            items: { type: 'Symbol', validations: [] },
          };
        }
        return field;
      });
    }
  }

  const fields = renderContentTypeFields([
    addStringField('contentType'),
    addStringField('cmsId'),
    addStringField('hashId'),
    ...cmsFields,
  ]);

  return renderInterface({
    name,
    fields,
  });
}

function renderRichText(field) {
  return 'string';
}

function renderContentTypeFields(fields) {
  return fields
    .filter((field) => !field.omitted)
    .map((field) => {
      const functionMap = {
        Array: renderArray,
        Boolean: renderBoolean,
        Date: renderSymbol,
        Integer: renderNumber,
        Link: renderLink,
        Location: renderLocation,
        Number: renderNumber,
        Object: renderObject,
        RichText: renderRichText,
        Symbol: renderSymbol,
        Text: renderSymbol,
      };

      return renderField(field, functionMap[field.type](field));
    })
    .join('\n\n');
}

async function renderFieldsOnly(contentTypes, { namespace } = {}) {
  const sortedContentTypes = contentTypes.sort((a, b) =>
    a.sys.id.localeCompare(b.sys.id)
  );

  const typingsSource = renderAllContentTypes(sortedContentTypes);
  const source = [renderNamespace(typingsSource, namespace)].join('\n\n');

  const prettierConfig = await prettier.resolveConfig(process.cwd());

  return prettier.format(source, { ...prettierConfig, parser: 'typescript' });
}

function renderAllContentTypes(contentTypes) {
  return contentTypes
    .map((contentType) => renderContentType(contentType))
    .join('\n\n');
}

async function getEnvironment() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT));
}

async function runCodegen() {
  const environment = await getEnvironment();
  const contentTypes = await environment.getContentTypes({ limit: 1000 });
  const output = await renderFieldsOnly(contentTypes.items);
  fsExtra.outputFileSync(outputPath, output);
}

runCodegen()
  .then(() => console.log('Types generated at: ', outputPath))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
