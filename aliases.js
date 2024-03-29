const moduleAlias = require('module-alias');

moduleAlias.addAliases({
  '@axios': getAxiosAlias(),
});

function getAxiosAlias() {
  const { version } = process;
  const [v] = version.split('.');

  switch (v) {
  case 'v10':
    return 'axios/dist/node/axios.cjs';
  case 'v11':
    return 'axios/dist/node/axios.cjs';
  default:
    return 'axios';
  }
}
