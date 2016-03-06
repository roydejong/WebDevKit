"use strict";

/**
 * A repository contains information on package candidates (installable package versions).
 */
function Repository () {
    // ...
}

let prototype = Repository.prototype;

/**
 * Returns a list of installable candidates contained within this repository.
 *
 * @returns {Array}
 */
prototype.getCandidates = function () {
    return [];
};

module.exports = Repository;