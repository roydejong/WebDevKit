"use strict";

const RepositoryFactory = require('./repositoryFactory.js');

/**
 * Utility for managing packages and their local installations.
 *
 * A "package" is any of the core systems that we manage, i.e. nginx, php and MySQL.
 * Each package can have multiple "candidates", i.e. a specific version that is available for a certain package.
 * Because we allow multiple simultaneous installations, packages then have different "environments".
 *
 * Example:
 * > We set up a new site. We need to initialize a nginx environment. The user picks the "mainline" candidate. We
 * > the candidate and set up a shiny new environment for it, effectively the "nginx 1.9.12" environment.
 *
 * A site can be added to an existing or new environment at any time.
 * An environment can be upgraded in itself, causing any sites attached to it to transition to a new environment.
 *
 * Mixing and matching is one of the most powerful things we offer, so you can have any combination of mysql/php/nginx
 * versions.
 */
var Packages = {
    /**
     * Returns installable candidates for a given package.
     *
     * @param packageName
     */
    getCandidates: function (packageName) {
        var repository = RepositoryFactory.getRepositoryFor(packageName);
        return repository.getCandidates();
    }
};

module.exports = Packages;