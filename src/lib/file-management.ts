import { writeTextFile, BaseDirectory, exists, createDir, readTextFile, readDir, FileEntry } from '@tauri-apps/api/fs';
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
  const path = dir ? `${appConfig.DEFAULT_BASE_FOLDER}/${dir}` : appConfig.DEFAULT_BASE_FOLDER;

  await writeTextFile(`${path}/${fileName}`, fileContents, { dir: BaseDirectory.Home });
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

export const loadDirContents = async (dir?: string): Promise<FileEntry[] | null> => {
  const path = dir ? `${appConfig.DEFAULT_BASE_FOLDER}/${dir}` : appConfig.DEFAULT_BASE_FOLDER;
  const dirExists = await exists(path, { dir: BaseDirectory.Home });

  if (dirExists) {
    const dirContents = await readDir(path, { dir: BaseDirectory.Home });
    return dirContents;
  }
};
