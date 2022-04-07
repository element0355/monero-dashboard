const dotenv = require('dotenv');
dotenv.config();

const log = require('loglevel-colors')('Main');
const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const port = process.env.PORT || 3000;
const remote_node = `${process.env.XCASH_HOST || 'localhost'}:${process.env.XCASH_PORT || 18281}`;

app.use('/api', proxy(remote_node));

app.get('/settings', (req, res) => {
    const { XCASH_HOST, XCASH_PORT, TICKER } = process.env;
    res.send({
        XCASH_HOST,
        XCASH_PORT,
        TICKER
    });
});

app.use('/', express.static('client/build'));

app.listen(port, () => {
    log.info(`X-CASH Dashboard proxy running on port ${port}`);
    log.info(`Remote node: ${remote_node}`);
});
