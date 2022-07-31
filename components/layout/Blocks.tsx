import blockComponents from '../blocks';
import { IPage } from '../../@types/generated/contentful';

export default function Blocks({ blocks }: { blocks: IPage['blocks'] }) {
  return (
    <>
      {blocks?.map(({ contentType, ...props }, index) => {
        const Block = blockComponents[contentType];
        return Block ? <Block key={contentType + index} {...props} /> : null;
      })}
    </>
  );
}
