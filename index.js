'use strict';
const http = require('http');
const server = http.createServer((req, res) => {
    const now = new Date();
    console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'charset': 'utf-8'
    });

    switch (req.method) {
        case 'GET':
            const fs = require('fs');
            const rs = fs.createReadStream('./index.html');
            rs.pipe(res);
            break;
        default:
            break;
    }

}).on('error', (e) => {
    console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
    console.error('[' + new Date() + '] Client Error', e);
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.info('[' + new Date() + '] Listening on ' + port);
});
