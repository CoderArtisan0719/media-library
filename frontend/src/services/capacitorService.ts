import { Filesystem, Directory } from '@capacitor/filesystem';

const saveFile = async (filename: string, data: string) => {
  await Filesystem.writeFile({
    path: filename,
    data: data,
    directory: Directory.Documents
  });
};
