"use strict";

const NginxRepository = require('./repository/nginx.js');
const PhpRepository = require('./repository/php.js');

var RepositoryFactory = {
    getRepositoryFor: function (packageName) {
        switch (packageName) {
            case 'nginx':
                return new NginxRepository();
            case 'php':
                return new PhpRepository();
            default:
                return new Repository();
        }
    }
};

module.exports = RepositoryFactory;