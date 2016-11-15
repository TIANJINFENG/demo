var AV = require('leancloud-storage');

var APP_ID = '4KzraCcshsibb7z1Dl7AwMph-gzGzoHsz';
var APP_KEY = 'jFDr696BkEnrdGW4Hk3CSArv';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

module.exports = AV;