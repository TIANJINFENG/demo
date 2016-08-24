var AV = require('leancloud-storage');

var APP_ID = 'iqnghLfOqAtee5Bo1QAgsAC3-gzGzoHsz';
var APP_KEY = 'KqPheplNC2ctxTW4XJlaXoeJ';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
module.exports = AV;