const fs = require('fs');

const express = require('express');

const app = express();

const path = require('path');

const compression = require('compression');

const zlib = require('zlib');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();


//  Would be passed to  like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
function getEnvironmentVariable(key, _default = '') { return process.env[key] || _default; }

function createEnvironementFile() {
	return `
  export const environment = {
    production: true,
    oauthBaseUrl: '${getEnvironmentVariable('OAUTH2_BASE_URL')}',
    oauthClientId: '${getEnvironmentVariable('OAUTH2_CLIENT_ID')}',
    oauthClientSecret: '${getEnvironmentVariable('OAUTH2_CLIENT_SECRET')}',
  };
  `;
}

const environment = getEnvironmentVariable('ENVIRONMENT');
const environmentFile = createEnvironementFile();

fs.writeFile(`./src/environments/environment.prod.ts`, environmentFile, (err) => {
	if (err) {
		console.log(err);
	}
});

app.use(express.static(__dirname + '/dist/ng-accounts'));

app.disable('etag');

app.use(compression(zlib.Z_BEST_COMPRESSION));

app.listen(process.env.PORT || 4200);

// redirect traffic to index.html
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/dist/ng-accounts/index.html'));
});
