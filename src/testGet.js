const db = require('./db');
const cid = db.getUidByGitHubName('keegjordan');
console.log("uid:", cid);