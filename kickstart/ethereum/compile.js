// Delete entire build folder
// Read Campaign.sol from the contracts folder
// Compile both contracts with Solidity compiler
// Write output to the build directory

const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'Campaign.sol'), 'utf-8'),
    },
    'CampaignFactory.sol': {
      content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'Campaign.sol'), 'utf-8'),
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJSONSync(path.resolve(buildPath, contract + '.json'), output[contract]);
}