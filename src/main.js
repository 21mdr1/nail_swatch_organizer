import { app, BrowserWindow, screen, ipcMain } from 'electron';
import { writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.maximize();

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('readSwatches', () => {
    try {
      const data = readFileSync('./data/data.json', 'utf8');
      return data;
    } catch (err) {
      console.error(err);
      return JSON.stringify([]);
    }
  });

  ipcMain.on('writeSwatches', (_, swatches) => {
    writeFile('./data/data.json', swatches, err => {
      if (err) {
        console.error(err);
      }
    });
  });

  ipcMain.handle('getNextKey', async () => {
    try {
      const data = JSON.parse(await readFileSync('./data/key.json', 'utf8'));
      data.key++;
      writeFile('./data/key.json', JSON.stringify(data), err => {
        if (err){ console.err(err)}
      });
      return data.key;
    } catch (err) {
      console.error(err);
      return 9999;
    }
  });

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
