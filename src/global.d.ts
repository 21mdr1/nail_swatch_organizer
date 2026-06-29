export {};

declare global {
  interface Window {
    storage: {
      readSwatches: () => string;
      writeSwatches: (swatches: string) => void;
      receiveMessage: (channel: string, func: (...args: any[]) => void) => void;
      uploadFile: (url: string, fileObj: File) => Promise<null>;
    };
  }
}
