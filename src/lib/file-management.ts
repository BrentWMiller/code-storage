import { invoke } from '@tauri-apps/api/tauri';
import { homeDir } from '@tauri-apps/api/path';
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
    if (!navigator) return;

    const homeDirPath = await homeDir();
    const path = dir ? `${homeDirPath}${appConfig.DEFAULT_BASE_FOLDER}/${dir}` : `${homeDirPath}/${appConfig.DEFAULT_BASE_FOLDER}`;

    await invoke('write_file', { path: `${path}/${fileName}`, contents: fileContents });
  } catch (error) {
    throw error;
  }
};

export const readFile = async (fileName: string, dir?: string): Promise<string | null> => {
  const path = dir ? `${appConfig.DEFAULT_BASE_FOLDER}/${dir}` : appConfig.DEFAULT_BASE_FOLDER;
  const fileExists = await exists(`${path}/${fileName}`, { dir: BaseDirectory.Home });

  if (fileExists) {
    const fileContents = await readTextFile(`${path}/${fileName}`, { dir: BaseDirectory.Home });
    return fileContents;
  } else {
    return null;
  }
};

export const loadDirContents = async (dir?: string): Promise<FileEntry[]> => {
  const path = dir ? `${appConfig.DEFAULT_BASE_FOLDER}/${dir}` : appConfig.DEFAULT_BASE_FOLDER;
  const dirExists = await exists(path, { dir: BaseDirectory.Home });

  if (dirExists) {
    const dirContents = await readDir(path, { dir: BaseDirectory.Home });
    return dirContents;
  } else {
    return [];
  }
};
