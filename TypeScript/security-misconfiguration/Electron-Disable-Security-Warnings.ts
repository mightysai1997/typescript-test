import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

const mainWindowOptions: BrowserWindowConstructorOptions = {
  webPreferences: {
    webSecurity: false
  }
};

const mainWindow = new BrowserWindow(mainWindowOptions);



const { app, BrowserWindow } = require('electron');

// Disable security warnings (DO NOT DO THIS IN PRODUCTION CODE)
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('disable-web-security');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html'); // Load your HTML file here

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
