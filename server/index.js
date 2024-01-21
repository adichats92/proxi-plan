require('dotenv/config');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
//All main routes under here
app.use('/api/posts', postsRouter);
app.use('/users', usersRouter);

//All main routes above this point
if (process.env.NODE_ENV === 'production') {
	const buildPath = path.join(__dirname, '../client/dist');
	app.use(express.static(buildPath));
	//This gets frontend routes for deployment
	app.get('*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is up on port ${PORT}`);
	});
});
