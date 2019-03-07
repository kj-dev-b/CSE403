require('dotenv').config();
const fs = require('fs');
const { Client } = require('pg');

const createTable = fs.readFileSync('./src/sql/create-table.sql').toString();
const getCidByPid = fs.readFileSync('./src/sql/get-cid-by-pid.sql').toString();
const getPidByCid = fs.readFileSync('./src/sql/get-pid-by-cid.sql').toString();
const getGitHubNameByUid = fs.readFileSync('./src/sql/get-githubname-by-uid.sql').toString();
const getUidByGitHubName = fs.readFileSync('./src/sql/get-uid-by-githubname.sql').toString();
const insertNewRecord = fs.readFileSync('./src/sql/insert-new-record.sql').toString();
const insertNewUser = fs.readFileSync('./src/sql/insert-new-user.sql').toString();

const client = new Client({
    connectionString: process.env.PGURI,
    host: process.env.HOST,
    database: process.env.DATABASE, 
    user: process.env.USER,
    port: process.env.DB_PORT,  
    password: process.env.DB_PASSWORD,
    ssl: true
});

client.connect();


// create the following table
// p2c(pid, cid)
exports.createTable = async()=>{
    try {
        //await client.connect();
        await client.query(createTable);
        //await client.end();
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
};

// get channelId uniqly identified by pull request id
exports.getCidByPid = async (pid) => {
    try {
        //await client.connect();
        const res = await client.query(getCidByPid, [pid]);
        const cid = res.rows[0];
        console.log("cid: ", cid);
        //await client.end();
        return cid;
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
};

// get pull request id uniqly identified by channel id
exports.getPidByCid = async (cid) => {
    try {
        //await client.connect();
        const res = await client.query(getPidByCid, [cid]);
        const pid = res.rows[0];
        console.log("pid: ", pid);
        //await client.end();
        return pid;
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
};

exports.getGitHubNameByUid = async (uid) => {
    try {
        //await client.connect();
        const res = await client.query(getGitHubNameByUid, [uid]);
        const githubName = res.rows[0];
        console.log("github_name: ", githubName);
        //await client.end();
        return githubName;
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
}

exports.getUidByGitHubName = async (githubName) => {
    try {
        //await client.connect();
        const res = await client.query(getUidByGitHubName, [githubName.toLowerCase()]);
        const uid = res.rows[0];
        console.log("slack_uid: ", uid);
        //await client.end();
        return uid;
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
}

// insert new record of pull request id and channel id, need to be unique.
exports.insertNewRecord = async(pid, cid) => {
    try {
        //await client.connect();
        const res = await client.query(insertNewRecord, [pid, cid]);
        console.log("res:", res);
        //await client.end();
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
};

// insert new record of pull request id and channel id, need to be unique.
exports.insertNewUser = async(uid, githubName) => {
    try {
        //await client.connect();
        const res = await client.query(insertNewUser, [uid, githubName.toLowerCase()]);
        console.log("res:", res);
        //await client.end();
        //return res;
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
};