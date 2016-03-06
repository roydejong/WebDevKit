'use strict';

const Logger = require('../src/io/logger.js');
const Config = require('../src/config.js');
const Downloader = require('../src/io/downloader.js');
const StatusBar = require('../src/ui/statusbar.js');

Logger.info('Main page script has loaded. Initializing...');

require('../src/ui/menu.js').init();

StatusBar.setStatus('check', 'Okay');

var downloaderTest = new Downloader('http://cachefly.cachefly.net/10mb.test');
StatusBar.trackDownload(downloaderTest);
downloaderTest.download();