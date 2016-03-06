"use strict";

const Repository = require('../repository.js');
const Candidate = require('../candidate.js');

/**
 * Repository containing php install candidates.
 *
 * Some notes about the packages in this local repository:
 * - All packages are sourced directly from windows.php.net
 * - All packages are non-thread-safe. TS is only useful for e.g. Apache, and even that is kind of disputed.
 * - All packages are 64 bit for now. Primary focus is developer machines after all. Should add x86 in the future.
 *
 * NB: x86 is the only option for PHP 5.4. Hopefully PHP 5.4 can be removed in the future.
 *
 * Dependencies:
 * - PHP 7 depends on VC14 (http://www.microsoft.com/en-us/download/details.aspx?id=48145)
 * - PHP 5.6 and PHP 5.5 depend on VC11 (http://www.microsoft.com/en-us/download/details.aspx?id=30679)
 * - PHP 5.4 depends on VC9 (http://www.microsoft.com/en-us/download/details.aspx?id=15336)
 *
 * @constructor
 */
function PhpRepository () { }
PhpRepository.prototype = new Repository();

let prototype = PhpRepository.prototype;

/**
 * @inheritdoc
 */
prototype.getCandidates = function () {
    return [
        new Candidate('php')
            .setVersion('PHP 7', '7.0.4')
            .setDownloadUrl('http://windows.php.net/downloads/releases/php-7.0.4-nts-Win32-VC14-x64.zip'),

        new Candidate('php')
            .setVersion('PHP 5.6', '5.6.19')
            .setDownloadUrl('http://windows.php.net/downloads/releases/php-5.6.19-nts-Win32-VC11-x64.zip'),

        new Candidate('php')
            .setVersion('PHP 5.5', '5.5.33')
            .setDownloadUrl('http://windows.php.net/downloads/releases/php-5.5.33-nts-Win32-VC11-x64.zip'),

        new Candidate('php')
            .setVersion('PHP 5.4', '5.4.45')
            .setDownloadUrl('http://windows.php.net/downloads/releases/php-5.4.45-nts-Win32-VC9-x86.zip')
    ];
};

module.exports = PhpRepository;