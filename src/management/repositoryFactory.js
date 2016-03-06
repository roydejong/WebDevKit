"use strict";

const NginxRepository = require('./repository/nginx.js');

var RepositoryFactory = {
    getRepositoryFor: function (packageName) {
        switch (packageName) {
            case 'nginx':
                return new NginxRepository();
            default:
                return new Repository();
        }
    }
};

module.exports = RepositoryFactory;