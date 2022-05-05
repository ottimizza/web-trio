const fs = require('fs');
// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

function getEnvironmentVariable(key, _default = '') { return process.env[key] || _default; }

function createEnvironementFile() {
  return `export const environment = {
  production: true,
  oauthBaseUrl: '${getEnvironmentVariable('OAUTH2_BASE_URL')}',
  oauthClientId: '${getEnvironmentVariable('OAUTH2_CLIENT_ID')}',
  serviceUrl: '${getEnvironmentVariable('SERVICE_URL')}',
  trioClientId: '${getEnvironmentVariable('TRIO_CLIENT_ID')}',
  allowedInstitutions: ${getEnvironmentVariable('ALLOWED_INSTITUTIONS', `['itau_br_business', 'bradesco_br_business', 'santander_br_business', 'caixa_br_business']`)},
};
`;
}

const environment = getEnvironmentVariable('ENVIRONMENT');
const environmentFile = createEnvironementFile();

console.log(`
  ENVIRONMENT -> ${environment}
  ---
  ${environmentFile}
`);

fs.writeFile(`./src/environments/environment.prod.ts`, environmentFile, (err) => {
  if (err) {
    console.log(err);
  }
});
