import { INTERNAL_FOLDER, PUBLIC_FOLDER } from './settings';

export var getFolder = (pack) => {
  return (pack.internal) ? INTERNAL_FOLDER : PUBLIC_FOLDER;
}
