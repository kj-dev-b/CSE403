require('dotenv').config();
const fs = require('fs');
const { Client } = require('pg');

const createTable = fs.readFileSync('./sql/create-table.sql').toString();
const getCidByPid = fs.readFileSync('./sql/get-cid-by-pid.sql').toString();
const getPidByCid = fs.readFileSync('./sql/get-pid-by-cid.sql').toString();
const insertNewRecord = fs.readFileSync('./sql/insert-new-record.sql').toString();


const client = new Client({
    connectionString: process.env.PGURI,
    ssl: true
});

// create the following table
// p2c(pid, cid)
exports.createTable = async()=>{
    try {
        await client.connect();
        await client.query(createTable);
        await client.end();
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
};

// get channelId uniqly identified by pull request id
exports.getCidByPid = async (pid) => {
    try {
        await client.connect();
        const res = await client.query(getCidByPid, [pid]);
        const cid= res.rows[0];
        console.log("cid: ", cid);
        await client.end();
        return cid;
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
};

// get pull request id uniqly identified by channel id
exports.getPidByCid = async (cid) => {
    try {
        await client.connect();
        const res = await client.query(getPidByCid, [cid]);
        const pid= res.rows[0];
        console.log("pid: ", pid);
        await client.end();
        return pid;
    } catch(err) {
        console.log(err.stack);
    }
};

// insert new record of pull request id and channel id, need to be unique.
exports.insertNewRecord = async(pid, cid) => {
    try {
        await client.connect();
        const res = await client.query(insertNewRecord, [pid, cid]);
        console.log("res:", res);
        await client.end();
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
};