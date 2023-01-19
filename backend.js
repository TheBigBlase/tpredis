let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

const db_controller = require('./databaseController');

let controller = new db_controller.DB_Controller();
controller.initDBConnection();

let app = express();

app.use(bodyParser.json({type: ['application/json', 'text/plain']}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.post('/login', (req, res) => {
	//console.log(res);
	console.log(req.body);
	let email = req.body.email;
	let password = req.body.password;

	controller.checkCredentialsUser(email, password).then((check) => {
		res.send(JSON.stringify({authentified: check}) + "\n");
	});
});

app.post('/', (req, res) => {
	//console.log(res);
	console.log(req.body);
	let username = req.body.username;
	let password = req.body.password;
})

app.post('/service', async (req, res) => {
	//can only use service if logged in

	let username = req.body.email;

	let firstTime = Number(await (redis.get("firstTime" + username)));
	let canUse = true;

	if(firstTime / 1000  < (Date.now() / 1000) - 10*60){
		redis.set("firstTime" + username, Date.now());
		redis.set(username, 0);
	}

	if(Number(await (redis.get(username))) < 10)
		redis.incr(username);
	else 
		canUse = false
	let useLeft = await redis.get(username);

	return res.send(JSON.stringify({canUse: canUse, useLeft: useLeft}));
});

app.listen(3000);

//redis
const redis = require('redis').createClient({});
redis.connect();


redis.on('error', err => {
    console.log('Error ' + err);
});
