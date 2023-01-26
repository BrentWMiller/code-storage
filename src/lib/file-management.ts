import { invoke } from '@tauri-apps/api/tauri';
import { BaseDirectory, exists, createDir, readTextFile, readDir, FileEntry } from '@tauri-apps/api/fs';
import { appConfig } from './config';

export const checkForAndCreateDir = async (dir?: string): Promise<boolean> => {
  const path = dir ? `${appConfig.DEFAULT_BASE_FOLDER}/${dir}` : appConfig.DEFAULT_BASE_FOLDER;

  // check if directory exists
  const dirExists = await exists(path, { dir: BaseDirectory.Home });
  if (!dirExists) {
    await createDir(path, { dir: BaseDirectory.Home });
  }

  return dirExists;
};

export const saveFile = async (fileName: string, fileContents: any, dir?: string) => {
  try {
    const homeDirPath = await invoke('get_home_dir');
    const path = dir ? `${homeDirPath}/${appConfig.DEFAULT_BASE_FOLDER}/${dir}` : `${homeDirPath}/${appConfig.DEFAULT_BASE_FOLDER}`;

    await invoke('write_file', { path: `${path}/${fileName}`, contents: fileContents });
  } catch (error) {
    throw error;
  }
};

export const readFile = async (fileName: string, dir?: string): Promise<string | null> => {
  const homeDirPath = await invoke('get_home_dir');
  const path = dir ? `${homeDirPath}/${dir}` : `${homeDirPath}/${appConfig.DEFAULT_BASE_FOLDER}`;
  const fileExists = await invoke('exists', { path: `${path}/${fileName}` });

  if (fileExists) {
    const fileContents: string = await invoke('read_file', { path: `${path}/${fileName}` });
    return fileContents;
  } else {
    return null;
  }
};

export const loadDirContents = async (dir?: string): Promise<string[]> => {
  const homeDirPath = await invoke('get_home_dir');
  const path = dir ? `${homeDirPath}/${dir}` : `${homeDirPath}/${appConfig.DEFAULT_BASE_FOLDER}`;
  const dirExists = await invoke('exists', { path });

  if (dirExists) {
    const files: string[] = await invoke('read_dir', { path });
    return files;
  } else {
    return [];
  }
};
