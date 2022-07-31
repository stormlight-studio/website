import traverse from 'traverse';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import safeJsonStringify from 'safe-json-stringify';
import { createClient } from 'contentful';
import omit from 'lodash/omit';
import { paramCase } from 'change-case';
import { escapeQuotes } from '../utils/assets/images';
import { IBlogCategory } from '../@types/generated/contentful.d';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken:
    process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN ||
    process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
    '',
  host: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN
    ? 'preview.contentful.com'
    : 'cdn.contentful.com',
});

interface ContentfulQuery {
  content_type: string;
  [field: string]: string | number;
}

export const fetchEntry = async <T>(query: ContentfulQuery) => {
  const [item] = await fetchEntries<T>(query);
  return item;
};

export const fetchEntries = async <T>(query: ContentfulQuery) => {
  if (!query.include) query.include = 10;
  const entries = await client.getEntries<T>(query);
  if (entries.items) return entries.items;
  console.log(`Error getting Entries for ${query.content_type}.`);
  return [];
};

const uniqueHashId = (fields: any, fallback: string): string => {
  return paramCase(
    fields?.subtitle ||
      fields?.title ||
      fields?.author ||
      fields?.cmsReference ||
      fallback
  );
};

const getEntryLinkHref = (fields: any): string | null => {
  if (fields?.entryLink?.fields?.url) {
    let href = fields.entryLink.fields.url;
    if (fields?.entryBlockLink) {
      href += `#${uniqueHashId(fields.entryBlockLink.fields, '')}`;
    }
    return href;
  }
  return null;
};

export const cleanPageData = (props: any) => {
  traverse(props).forEach(function () {
    // move fields up to root
    if (this.key === 'fields') {
      Object.entries(this.node).forEach(([key, value]) => {
        if (this.parent) {
          this.parent.node[key] = value;
        }
      });
    }

    // add contentType and unique hashId for hash linking
    if (
      this.key === 'contentType' &&
      this.node?.sys?.id &&
      this.parent?.parent
    ) {
      this.parent.parent.node.contentType = this.node.sys.id;
      this.parent.parent.node.hashId = uniqueHashId(
        this.parent.parent.node.fields,
        this.node.sys.id
      );
    }

    // add cmsId
    if (
      this.key === 'id' &&
      this.parent?.node?.type === 'Entry' &&
      this.parent?.parent
    ) {
      this.parent.parent.node.cmsId = this.node;
    }
  });

  props = traverse(props).map(function () {
    if (this.node?.nodeType === 'document') {
      const htmlString = documentToHtmlString(this.node, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: ({
            data: {
              target: { fields },
            },
          }) => {
            // TODO: Handle videos
            return `<p><img class="lazyload" data-src="${
              fields.file.url
            }" alt="${escapeQuotes(fields.description)}" /></p>`;
          },
          [BLOCKS.EMBEDDED_ENTRY]: ({ data: { target: block } }) => {
            if (block.contentType === 'link') {
              return `<nextjs-link data='${JSON.stringify({
                href: getEntryLinkHref(block.fields) || block.href,
                text: block.text,
              })}'></nextjs-link>`;
            }
            return '';
          },
        },
      });

      // convert newlines to br
      this.update(htmlString.replace(/\\n/g, '<br/>'));
    }

    // convert entryLink/entryBlockLink to href
    // remove entryLink/entryBlockLink
    if (this.node?.contentType === 'link') {
      const linkFields = omit(this.node.fields, [
        'cmsReference',
        'entryLink',
        'entryBlockLink',
      ]);
      const entryLinkHref = getEntryLinkHref(this.node.fields);
      if (entryLinkHref) {
        linkFields.href = entryLinkHref;
      }
      this.update(linkFields);
    }

    if (this.key === 'file' && this.node?.url && this.parent?.parent) {
      let src = this.node.url;

      if (this.node.details.image) {
        // if (/\.(png|jpg|jpeg)$/.test(src)) {
        //   src += '?fm=webp';
        // }
        this.parent.parent.update({
          src,
          alt: this.parent.node.description || this.parent.node.title,
          width: this.node.details.image.width,
          height: this.node.details.image.height,
        });
      } else {
        this.parent.parent.update({ src });
      }
    }

    if (
      this.key &&
      ['colour', 'backgroundColor'].includes(this.key) &&
      this.node?.colour
    ) {
      this.update(this.node.colour);
    }

    if (
      this.key === 'categories' &&
      this.node.length &&
      typeof this.node[0] !== 'string'
    ) {
      this.update(this.node.map((category: IBlogCategory) => category.title));
    }
  });

  props = traverse(props).map(function () {
    if (this.key && ['metadata', 'sys', 'fields'].includes(this.key)) {
      this.remove();
    }
  });

  return JSON.parse(safeJsonStringify(props));
};
