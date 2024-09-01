export function loadAsset() {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.src = './assets/all.png';
    });
}

export function spliceAssets(image) {
    const assets = [];
    const strokes = document.createElement('canvas');
    strokes.width = 55 * 7;
    strokes.height = 24;
    const strokesCtx = strokes.getContext('2d');
    strokesCtx.drawImage(image, 0, 0, 55 * 7, 24, 0, 0, 55 * 7, 24);
    assets.push(strokes);
    const bubbles = document.createElement('canvas');
    bubbles.width = 32 * 7;
    bubbles.height = 32;
    const bubblesCtx = bubbles.getContext('2d');
    bubblesCtx.drawImage(image, 0, 24, 32 * 7, 32, 0, 0, 32 * 7, 32);
    assets.push(bubbles);
    const cauldronFrame = document.createElement('canvas');
    cauldronFrame.width = 128;
    cauldronFrame.height = 128;
    const cauldronFrameTempCtx = cauldronFrame.getContext('2d');
    cauldronFrameTempCtx.drawImage(image, 0, 56, 128, 128, 0, 0, 128, 128);
    assets.push(cauldronFrame);
    const table = document.createElement('canvas');
    table.width = 128;
    table.height = 128;
    const tableCtx = table.getContext('2d');
    tableCtx.drawImage(image, 128, 56, 128, 128, 0, 0, 128, 128);
    assets.push(table);
    return assets;
}