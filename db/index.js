const con = require('./connection')


class db {
    constructor(con) {
        this.con = con;
    }

    getDepartments() {
        const query = this.con.promise().query("SELECT * FROM department;");
        return query;
    }


}

module.exports = db;