"use strict";

let Logger = {
    pad2: function (no, len) {
        if (!len) len = 2;

        var str = no.toString();

        var missingLen = len - str.length;

        if (missingLen > 0) {
            for (var i = 0; i < missingLen; i++) {
                str = '0' + str;
            }
        }

        return str;
    },

    formatMessage: function (text) {
        var now = new Date();

        var timeStamp = '[';
        timeStamp += Logger.pad2(now.getHours());
        timeStamp += ':';
        timeStamp += Logger.pad2(now.getMinutes());
        timeStamp += ':';
        timeStamp += Logger.pad2(now.getSeconds());
        timeStamp += '.';
        timeStamp += Logger.pad2(now.getMilliseconds(), 3);
        timeStamp += ']';

        text = timeStamp + '\t\t' + text;
        return text;
    },

    log: function (message) {
        console.log(Logger.formatMessage(message));
    },

    info: function (message) {
        console.info(Logger.formatMessage(message));
    },

    warn: function (message) {
        console.warn(Logger.formatMessage(message));
    },

    error: function (message) {
        console.error(Logger.formatMessage(message));
    }
};

module.exports = Logger;