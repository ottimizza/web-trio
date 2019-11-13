const express = require('express');

const app = express();

const path = require('path');

const compression = require('compression');

const zlib = require('zlib');

app.use(express.static(__dirname + '/dist/ng-accounts'));

app.disable('etag');

app.use(compression(zlib.Z_BEST_COMPRESSION));

app.listen(process.env.PORT || 4200);

// redirect traffic to index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/ng-accounts/index.html'));
});
