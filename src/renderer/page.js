'use strict';

const Logger = require('../src/io/logger.js');
const Config = require('../src/config.js');
const Downloader = require('../src/io/downloader.js');

Logger.info('Main page script has loaded. Initializing...');

require('../src/ui/menu.js').init();

var downloaderTest = new Downloader('http://cachefly.cachefly.net/10mb.test');
downloaderTest.download();
