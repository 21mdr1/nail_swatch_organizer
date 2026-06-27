// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('storage', {
    readSwatches: () => ipcRenderer.invoke('readSwatches'),
    writeSwatches: (swatches) => ipcRenderer.send('writeSwatches', swatches),
    getNextKey: () => ipcRenderer.invoke('getNextKey'),
    uploadFile: async (url, fileObj) => (
        ipcRenderer.invoke('uploadFile', url, (new Uint8Array(await fileObj.arrayBuffer())))
    ),
})