"use strict";

const Downloader = require('../io/downloader.js');

/**
 * A installation candidate for a given package, as retrieved from a repository.
 * Contains version information.
 */
function Candidate (packageName) {
    this.packageName = packageName;
    this.versionStability = 'Unknown Stability';
    this.version = 'Unknown Version';
    this.downloadUrl = null;
}

let prototype = Candidate.prototype;

prototype.setVersion = function (stability, version) {
    this.versionStability = stability;
    this.version = version;
    return this;
};

prototype.setDownloadUrl = function (downloadUrl) {
    this.downloadUrl = downloadUrl;
    return this;
};

prototype.createDownloader = function() {
    return new Downloader(this.downloadUrl);
};

module.exports = Candidate;