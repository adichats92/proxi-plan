require('dotenv/config');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts');
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
//All routes under here
app.use('/api/posts', postsRouter);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is up on port ${PORT}`);
	});
});
