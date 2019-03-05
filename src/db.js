require('dotenv').config();
const fs = require('fs');
const { Client } = require('pg');

const createTable = fs.readFileSync('./sql/create-table.sql').toString();
const getCidByPid = fs.readFileSync('./sql/get-cid-by-pid.sql').toString();
const getPidByCid = fs.readFileSync('./sql/get-pid-by-cid.sql').toString();
const insertNewRecord = fs.readFileSync('./sql/insert-new-record.sql').toString();


//console.log(createTable);
const client = new Client({
    connectionString: process.env.PGURI,
    ssl: true
});
//client.connect();

// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()

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