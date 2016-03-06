'use strict';

/**
 * This is the application entry point. It configures our Electron browser window, and handles some window events.
 * This is the *ONLY* code that runs in the application process.
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const Menu = require('menu');
const Logger = require('./io/logger.js');
const Config = require('./config.js');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        icon: './assets/app_icon.png'
    });

    if (Config.Flags.InstantDevTools) {
        mainWindow.toggleDevTools();
    }

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    // Initialize a blank, dummy menu to avoid a content flash on app start
    let generatedMenu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(generatedMenu);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
