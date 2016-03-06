"use strict";

var StatusBar = {
    setStatus: function (icon, text) {
        let $container = jQuery('.status-bar');
        $container.removeClass('active');
        $container.html('');

        if (icon) {
            $('<i />')
                .addClass('fa')
                .addClass('fa-' + icon)
                .appendTo($container);
        }

        $('<span />')
            .text(text)
            .appendTo($container);
    },

    trackDownload: function (downloader) {
        // If we have not yet attached to this downloader's progress events, do this now
        if (!downloader.attachedToStatusBar) {
            downloader.attachedToStatusBar = true;
            downloader.onProgress(StatusBar.trackDownload);
        }

        if (downloader.isComplete) {
            StatusBar.setStatus('check', 'Download complete');
            return;
        }

        if (downloader.hasErrored) {
            StatusBar.setStatus('warning', 'Download failed');
            return;
        }

        let $container = jQuery('.status-bar');
        $container.addClass('active');
        $container.html('');

        $('<i />')
            .addClass('fa')
            .addClass('fa-download')
            .appendTo($container);

        $('<span />')
            .text('Downloading ' + downloader.filename + ' (' + downloader.percentage + '%)...')
            .appendTo($container);

        var $pgoressBar = $('<div />')
            .addClass('progress-bar')
            .appendTo($container);

        $('<div />')
            .addClass('inner')
            .css('width', downloader.percentage + '%')
            .appendTo($pgoressBar);
    }
};

module.exports = StatusBar;