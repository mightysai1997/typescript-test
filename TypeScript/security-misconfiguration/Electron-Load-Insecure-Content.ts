/*
Sample code for vulnerability code : Configuration Issues: Electron Load Insecure Content
CWE : CWE-16
Discription : he provided code lacks data integrity, traffic encryption, and server authentication when loading remote resources over HTTP. This insecure practice exposes the application to potential Man-In-The-Middle attacks due to the absence of secure transmission protocols
*/

const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      allowRunningInsecureContent: true, // This allows insecure content to be loaded
    }
  });

  mainWindow.loadURL('http://insecure-website.com'); // Loading content over HTTP (insecure) (Source and Sink)
});
