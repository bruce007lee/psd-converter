import pixels from 'image-pixels';
import FileSaver from 'file-saver';

export const loadImageData = async (path: string): Promise<ImageData> => pixels(path);

export const fixImageUrl = (url: string) => {
  if (url) {
    const idx = url.lastIndexOf('/');
    return url.substring(0, idx) + encodeURIComponent(url.substring(idx, url.length));
  }
  return url;
};

export const saveAs = (data: Blob | Buffer, fileName: string): void => {
  let blob: Blob;
  if (data instanceof ArrayBuffer) {
    blob = new Blob([data], { type: 'application/octet-stream' });
  } else {
    blob = data as Blob;
  }
  FileSaver.saveAs(blob, fileName);
};
