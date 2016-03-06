"use strict";

const http = require('http');
const fs = require('fs');

const Logger = require('./logger.js');
const Paths = require('./paths.js');

let prototype = Downloader.prototype;

function Downloader(url, targetPath) {
    this.url = url;
    this.filename = this.url.substring(this.url.lastIndexOf('/') + 1);
    this.callbacks = [];

    if (targetPath) {
        this.targetPath = targetPath;
    } else {
        this.targetPath = Paths.getDownloadsPath() + '/' + this.filename;
    }

    this.reset();
}

prototype.reset = function () {
    this.bytesReceived = 0;
    this.bytesTotal = Number.MAX_VALUE;

    this.isComplete = false;
    this.isRunning = false;
    this.hasErrored = false;
    this.errorMessage = null;

    this.percentage = 0;
    this.lastLogPercentage = -1;
};

prototype.onProgress = function (userCallback) {
    this.callbacks.push(userCallback);
};

prototype.signalProgress = function () {
    var progressPayload = this;

    for (var i = 0; i < this.callbacks.length; i++) {
        this.callbacks[i](progressPayload);
    }
};

prototype.download = function () {
    this.reset();

    Logger.info('(Downloader) Download starting: ' + this.url);

    var onError = function (errorMessage) {
        Logger.error('(Downloader) Download failed. ' + errorMessage);

        this.isComplete = false;
        this.isRunning = false;
        this.hasErrored = true;
        this.errorMessage = errorMessage;

        this.signalProgress();
    }.bind(this);

    try {
        this.outputStream = fs.createWriteStream(this.targetPath);
    }
    catch (e) {
        Logger.error(e);
    }

    if (this.outputStream == null || !this.outputStream.writable) {
        onError('Could not create output stream');
        return;
    }

    let request = http.get(this.url, function (response) {
        if (response.statusCode != 200) {
            onError('Received response with status code ' + response.statusCode + '; expected 200.');
            return;
        }

        if (response.headers['transfer-encoding'] == 'chunked') {
            onError('Server tried to offer file in chunked encoding, which is not supported.');
            return;
        }

        this.bytesTotal = parseInt(response.headers['content-length']);

        Logger.info('(Downloader) Received response. Content length is ' + this.bytesTotal + ' bytes.');

        response.on('data', function (chunk) {
            this.isRunning = true;
            this.isComplete = false;
            this.bytesReceived += chunk.byteLength;

            this.outputStream.write(chunk);

            let percentage = (this.bytesReceived / this.bytesTotal);
            let displayPercentage = (Math.floor(percentage * 100)).toFixed(0);
            let comparePercentage = Math.floor(displayPercentage / 10);

            this.percentage = displayPercentage;

            if (this.lastLogPercentage != comparePercentage) {
                Logger.log('(Downloader)\t-> ' + displayPercentage + '%\t(' + this.bytesReceived + ' of ' + this.bytesTotal + ' bytes)');
                this.lastLogPercentage = comparePercentage;
            }

            this.signalProgress();
        }.bind(this));

        response.on('end', function () {
            Logger.info('(Downloader) Download completed successfully. Saved at ' + this.targetPath);

            this.isComplete = true;
            this.isRunning = false;

            this.signalProgress();
        }.bind(this));

        response.on('error', function () {
            onError();
        }.bind(this));
    }.bind(this));
};

module.exports = Downloader;