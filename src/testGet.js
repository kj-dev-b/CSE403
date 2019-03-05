const db = require('./db');
const cid = db.getCidByPid(1);
console.log("cid:", cid);