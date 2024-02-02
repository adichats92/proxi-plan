require('dotenv/config');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts');
const todosRouter = require('./routes/todos');
const locationRouter = require('./routes/location');
const radioRouter = require('./routes/radio');
const apiLocationRouter = require('./routes/apiLocation');
const commentsRouter = require('./routes/comments');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// const authenticateMiddleware = require('./middleware/auth');
// app.use(authenticateMiddleware);

//All main routes under here
app.use('/api/auth', authRouter);
app.use('/api/location', locationRouter);
app.use('/api/apilocation', apiLocationRouter);
app.use('/api/posts', postsRouter);
app.use('/api/todos', todosRouter);
app.use('/users', usersRouter);
app.use('/api/radio', radioRouter);
app.use('/api/posts/:id/comments', commentsRouter);

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
