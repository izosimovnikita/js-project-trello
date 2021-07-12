const express = require('express');
const body = require('body-parser');
const cors = require('cors');

const app = express();
app.use(body.json());

app.use(cors({origin: '*'}));

const port = process.env.PORT || 8002;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});