const express = require('express');
const path = require('path');
const uuid = require('uuid');
const app = express();
const port = 8080;
const User = require('./models/user');
const Cart = require('./models/cart');
const Product = require('./models/product');

app.listen(port)

/* 
    Serve static content from directory "public",
    it will be accessible under path /, 
    e.g. http://localhost:8080/index.html
*/

app.use(express.static('public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

// Upon starting the application, a series of users with specific usernames and passwords will be automatically created 

const users = [];

const user1 = new User('user1', 'password1');
const user2 = new User('user2', 'password2');
const user3 = new User('user3', 'password3');
const user4 = new User('admin', 'admin');

users.push(user1, user2, user3, user4);

// Route: /category.html
app.post('/LoginService', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	// Validates the input to make sure that both 'username' and 'password' are provided.
	// If either of them is missing, it returns a 400 Bad Request response with an error message.
	if (!username || !password) {
		return res.status(400).json({ error:'Invalid input' });
	}

	// Search the 'users' array for a user with matching 'username' and 'password'
	const user = users.find(user => user.username === username && user.password === password);

	if (!user) {
		// If user is not found, return 401 Unauthorized response with an error message
		return res.status(401).json({ error: "Invalid username or password" });
	} else {
		// If user is found, generate a new session ID and return 200 OK response 
		const sessionId = uuid.v4();
		user.sessionId = sessionId;
		return res.status(200).json({ sessionId });
	}	
})


// Route: /CIS
app.post('/CIS', (req, res) => {
	// cart functionality goes here..
	// prosthiki sto kalathi 
	// elegxos an username antistoixei sto sessionId
	// epistrofh kwdikou apokrishs
	// an dn einai sundedemenos -> koumpi bgazei error
})
