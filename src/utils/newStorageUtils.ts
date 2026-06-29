import type { iSwatch } from "./Grid";

async function restoreSwatches(onSuccess=(_: any) => {}, onFailure=(e: any,_: any) => console.error(e)) {
    let swatches;
    try {
        swatches = JSON.parse(window.storage.readSwatches());
        onSuccess(swatches);
    } catch (e) {
        swatches = [];
        onFailure(e, []);
    }

    return swatches;
}

async function storeSwatches(swatches: iSwatch[], onSuccess=() => {}, onFailure=(e:any) => console.log(e)) {
    try {
        window.storage.writeSwatches(JSON.stringify(swatches));
        onSuccess();
    } catch(e) {
        onFailure(e);
    }
}

async function uploadFile(fileObj: File) {
    const BASE_PATH = './'
    await window.storage.uploadFile(BASE_PATH + fileObj.name, fileObj);
}


export { restoreSwatches, storeSwatches, uploadFile}