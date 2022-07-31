const fs = require("fs");
const path = require("path");
const data = require("./generated/export.json");

const allowedContentTypes = [
  "blogArticle",
  "blogCategory",
  "caseStudy",
  "contactForm",
  "colour",
  "content",
  "ctaBanner",
  "globalConfig",
  "hero",
  "heroBlog",
  "heroCaseStudies",
  "link",
  "page",
];

const getContentTypesValidations = (current) => {
  const linkContentType = current.filter((contentType) =>
    allowedContentTypes.includes(contentType)
  );
  if (linkContentType.length) {
    return [{ linkContentType }];
  }
  return [];
};

const contentTypes = data.contentTypes
  .filter((contentType) => allowedContentTypes.includes(contentType.sys.id))
  .map((contentType) => {
    const fields = contentType.fields.map((field) => {
      if (field.type === "Link" && field.linkType !== "Asset") {
        return {
          ...field,
          validations: getContentTypesValidations(
            field.validations[0].linkContentType
          ),
        };
      }

      if (
        field.type === "Array" &&
        field.items?.type === "Link" &&
        field.items?.linkType === "Entry" &&
        field.linkType !== "Asset"
      ) {
        return {
          ...field,
          items: {
            ...field.items,
            validations: getContentTypesValidations(
              field.items.validations[0].linkContentType
            ),
          },
        };
      }
      return field;
    });

    return {
      ...contentType,
      fields,
    };
  });

const editorInterfaces = data.editorInterfaces.filter((editorInterface) => {
  return allowedContentTypes.includes(editorInterface.sys.contentType.sys.id);
});

fs.writeFileSync(
  path.resolve(process.cwd(), "generated/export.json"),
  JSON.stringify({ ...data, contentTypes, editorInterfaces }, null, 2),
  "utf8"
);
