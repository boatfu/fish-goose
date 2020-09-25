const fs = require("fs");
const path = require("path");
const mysql = require("mysql");
const config = require("../config").db;
const pool = mysql.createPool({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database,
});

const walkFile = () => {
    try {
        let files = fs.readdirSync(path.resolve(__dirname, "sqls"));
        let fileMap = {};
        for (const fileName of files) {
            fileMap[fileName] = fs
                .readFileSync(path.resolve(__dirname, "sqls", fileName))
                .toString();
        }
        return fileMap;
    } catch (e) {
        console.error(e, "遍历sql文件出现错误");
        return null;
    }
};

const errorLog = (fileName, index, sql) => {
    console.error(`[ERROR] file ${fileName} at line ${index + 1} as ${sql} `);
};

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

const createTables = async () => {
    const fileMap = walkFile();
    if (fileMap === null) {
        return;
    }
    for (const [fileName, content] of Object.entries(fileMap)) {
        sqlList = content.split(";");
        for (const [i, sql] of sqlList.entries()) {
            if (sql.trim()) {
                try {
                    await query(sql);
                } catch (e) {
                    // console.error(e);
                    errorLog(fileName, i, sql);
                    break;
                }
            }
        }
    }
    console.log("all table create success!");
};

createTables();
