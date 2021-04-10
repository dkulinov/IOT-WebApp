var mysql = require('mysql');
const CONFIG = require('./config.json');

let pool = mysql.createPool({
    host: CONFIG.host,
    user: CONFIG.user,
    password: CONFIG.password,
    database: CONFIG.database
});

const signUp = function(data, callback) {
    const CUSTOMERS_TABLE_SQL = `INSERT INTO customers VALUES(${data.first_name}, ${data.last_name}, ${data.email}, ${data.pw})`;
    const DEVICES_TABLE_SQL = `INSERT INTO devices VALUES(${data.device_id}, ${data.cloudActivated}, ${data.email})`;
    pool.getConnection(function (err, connection) {
        if (err) 
        {
            callback(true);
            return;
        }
        else 
        {
            connection.query(CUSTOMERS_TABLE_SQL, function (err, result1) 
            {
                if (err) {
                    callback(true);
                    return;
                }
                else {
                    connection.query(DEVICES_TABLE_SQL, function (err, result2) {
                        connection.release();
                        if (err) {
                            callback(true);
                            return;
                        } else {
                            callback(false, [result1, result2]);
                        }
                    });
                }
            });
        }
    }
)};
module.exports.signUp = signUp;

function logIn(data, callback) {
    const sql = `SELECT FROM customers WHERE email = ${data.email} AND pw = ${data.pw}`;
    pool.getConnection(function(err,connection){
        if(err)
        {
            callback(true);
            return;
        }
        else
        {
            connection.query(sql, function(error, result)
            {
                connection.release();
                if(error)
                {
                    callback(true);
                    return;
                }
                else 
                {
                    callback(false, result);
                }
            });
        }
    });
}
module.exports.logIn = logIn;

const putRecording = (data, callback) => {
    const sql = `INSERT INTO uploads(link, device_id) VALUES('${data.link}', '${data.device_id}')`;
    pool.getConnection(function(err, connection){
        if(err)
        {
            callback(true);
            return;
        }
        else{
            connection.query(sql, function(error, result)
            {
                connection.release();
                if(error)
                {
                    callback(true);
                    return;
                }
                else{
                    callback(false, result);
                }
            });
        }
    })
}
module.exports.putRecording = putRecording;

const getDevices = function(email, callback)
{
    const sql = `SELECT device_id, cloudActivated FROM devices WHERE email = ${email}`;
    pool.getConnection(function(err, connection){
        if(err)
        {
            callback(true);
            return;
        }
        else{
            connection.query(sql, result)
            {
                connection.release();
                if(err)
                {
                    callback(true);
                    return;
                }
                else{
                    callback(false, result);
                }
            }
        }
    });
}
module.exports.getDevices = getDevices;

const getRecordings = function(device, callback)
{
    const sql = `SELECT link FROM uploads WHERE device_id = '${device}'`
    pool.getConnection(function(err, connection){
        if(err)
        {
            callback(true);
            return;
        }
        else{
            connection.query(sql, function(error, result)
            {
                connection.release();
                if(error)
                {
                    callback(true);
                    return;
                }
                else{
                    callback(false, result);
                }
            });
        }
    });
}
module.exports.getRecordings = getRecordings;