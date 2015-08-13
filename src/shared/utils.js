import { INTERNAL_FOLDER, PUBLIC_FOLDER } from './settings';

export const getFolder = (pack) => {
  return (pack.internal) ? INTERNAL_FOLDER : PUBLIC_FOLDER;
};
