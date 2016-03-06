'use strict';

const electron = require('electron').remote;
const Menu = electron.Menu;
const Config = require('../config.js');

let menuTemplate = [];

// Developer menu
if (Config.Flags.DeveloperMode)
{
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                label: `App version ${electron.app.getVersion()}`,
                enabled: false
            },
            {
                label: 'Reload',
                accelerator: 'F5',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.reload();
                    }
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: 'F12',
                click: function(item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}

// Help menu
menuTemplate.push({
    label: 'Help',
    submenu: [
        {
            label: 'About'
        },
        {
            type: 'separator'
        },
        {
            label: 'GitHub repository',
            click: function () {
                console.log(Config);
                electron.shell.openExternal(Config.Urls.Github);
            }
        },
        {
            label: 'Report an issue',
            click: function () {
                console.log(Config);
                electron.shell.openExternal(Config.Urls.ReportIssue);
            }
        }
    ]
});

// Init function
exports.init = function () {
    let generatedMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(generatedMenu);
};