import { useContext, createContext } from 'react';
import { IGlobalConfig } from '../@types/generated/contentful';

export interface GlobalConfig extends IGlobalConfig {
  pageUrl?: string;
  pageUrlFull?: string;
}

const GlobalContext = createContext({} as GlobalConfig);

export const useGlobal = () => useContext(GlobalContext);

export default GlobalContext;
