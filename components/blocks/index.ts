import { FunctionComponent } from 'react';

interface Blocks {
  [key: string]: FunctionComponent;
}

const importBlocks = (requireContext: __WebpackModuleApi.RequireContext) => {
  const blocks: Blocks = {};

  return requireContext.keys().reduce((obj, key) => {
    const blockName = key.replace(/\.tsx$/, '').replace(/^\.\//, '');
    if (blockName) {
      // eslint-disable-next-line no-param-reassign
      obj[blockName] = requireContext(key).default;
    }

    return obj;
  }, blocks);
};

const blocks = importBlocks(require.context('./', true, /\.tsx$/));
// At build-time cache will be populated with all required modules.

export default blocks;
