"use strict";

const electron = require('electron').remote;
const app = electron.app;
const fs = require('fs');

const Logger = require('./logger.js');

var Paths = {
    mkdirSync: function (path) {
        try {
            fs.mkdirSync(path);
        } catch (e) {
            if (e.code != 'EEXIST') {
                Logger.error('Directory structure could not be created');
            }
        }
    },

    getStorageRootPath: function () {
        var basePath = app.getPath('home') + '/' + 'WDK';
        this.mkdirSync(basePath);
        return basePath;
    },

    getDownloadsPath: function () {
        var path = Paths.getStorageRootPath() + '/' + 'Downloads';
        this.mkdirSync(path);
        return path;
    }
};

module.exports = Paths;