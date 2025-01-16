const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Hackathon_Agnel',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

