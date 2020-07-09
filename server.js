const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// App configuration
app.set('view engine', 'ejs');

const port = process.env.PORT || 4000

app.use(express.json());
app.use(cors());

// sanity check
// app.get('/', function (req, res) {
//     res.send('Server is up and running');
// });

// API routes
app.use('/api/v1/auth', routes.auth);

app.listen(port, function () {
    console.log(`Server is running on http://localhost:${port}`);
});