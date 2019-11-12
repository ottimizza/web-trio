// const fs = require('fs');

// require('dotenv').config();

// function getEnvironmentVariable(key: string, _default: string = '') { return process.env[key] || _default; }

// function createEnvironementFile() {
//   return `
//   export const environment = {
//     production: true,
//     oauthBaseUrl: '${getEnvironmentVariable('OAUTH2_BASE_URL')}',
//     oauthClientId: '${getEnvironmentVariable('OAUTH2_CLIENT_ID')}',
//     oauthClientSecret: '${getEnvironmentVariable('OAUTH2_CLIENT_SECRET')}',
//   };
//   `;
// }

// const environment = getEnvironmentVariable('ENVIRONMENT');
// const environmentFile = createEnvironementFile();

// fs.writeFile(`./src/environments/environment.prod.ts`, environmentFile, (err) => {
//   if (err) {
//     console.log(err);
//   }
// });
