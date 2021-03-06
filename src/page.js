'use strict';

/**
 * This file is embedded in index.html and acts as a bootstrapper for all code which runs under the renderer (browser
 * page) process.
 *
 * Note: Because of this, our working directory (__dirname) is set to the "html" subdirectory...
 */

// -- System init -- //
const Logger = require('./io/logger.js');

Logger.info('Main page script has loaded. Initializing...');

// -- UI init -- //
require('./ui/menu.js').init();
require('./ui/pages.js').init();