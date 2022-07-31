import { FunctionComponent } from 'react';

interface Icons {
  [key: string]: FunctionComponent;
}

const importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  const icons: Icons = {};

  return requireContext.keys().reduce((obj, key) => {
    const iconName = key
      .replace(/\.svg$/, '')
      .split('/')
      .pop();

    if (iconName) {
      // eslint-disable-next-line no-param-reassign
      obj[iconName] = requireContext(key).default;
    }

    return obj;
  }, icons);
};

const icons = importAll(require.context('.', true, /\.svg$/));
// At build-time cache will be populated with all required modules.

export default icons;
