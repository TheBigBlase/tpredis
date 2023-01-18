const mariadb = require("mariadb");

class DB_Controller {
	/*
		Controller of the database, must call initDBConnection before using other functions.
		*/
	constructor() {
		this.path = "./credentials";
	}

	async parseCredentials(path) {
		/*
				Parse credentials in PolyChat/database/credentials.json
				FIX: Might cause some problems if node is not run from the root of the project.
				*/

		this.credentials = require(`${this.path}`);//surely nothing bad could happen Clueless
	}

	async initDBConnection() {
		/*
				Connects to the database
				*/
		await this.parseCredentials(this.path);

		const pool = mariadb.createPool({
			host: this.credentials['host'],
			user: this.credentials['user'],
			password: this.credentials['password'],
			connectionLimit: 5,
			trace: true // for debug purposes
		});

		let conn;
		try {
			conn = await pool.getConnection();
			await conn.query('use tpredis');
		} catch (err) {
			throw err;
		} finally {
			if (conn) await conn.end();
		}

		this.conn = conn;
	};

	async checkCredentialsUser(mail_user, password_user) {
		/*
				Checks if the credentials provided by a user are correct.
				Returns true if the credentials match a user in the database, false otherwise.
				*/

		// Encrypt password
		//no i dont think i will
		//let hash = sha256.create();
		//hash.update(password_user);
		//let encrypted_password = hash.hex();

		// Select user and check if password matches
		let res = await this.conn.query("SELECT * FROM user WHERE email = ? and password = ?", [mail_user, password_user]);
		return res[0] !== undefined;
	}
}

module.exports = {DB_Controller}
