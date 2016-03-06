"use strict";

const Repository = require('../repository.js');
const Candidate = require('../candidate.js');

/**
 * Repository containing nginx install candidates.
 * @constructor
 */
function NginxRepository () { }
NginxRepository.prototype = new Repository();

let prototype = NginxRepository.prototype;

/**
 * @inheritdoc
 */
prototype.getCandidates = function () {
    return [
        new Candidate('nginx')
            .setVersion('Mainline', '1.9.12')
            .setDownloadUrl('http://nginx.org/download/nginx-1.9.12.zip'),

        new Candidate('nginx')
            .setVersion('Stable', '1.8.1')
            .setDownloadUrl('http://nginx.org/download/nginx-1.8.1.zip'),

        new Candidate('nginx')
            .setVersion('Legacy', '1.6.3')
            .setDownloadUrl('http://nginx.org/download/nginx-1.6.3.zip')
    ];
};

module.exports = NginxRepository;