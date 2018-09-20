#!/usr/bin/env node

const program = require('commander');

const { getBarcode } = require('./main');

const { prompt } = require('inquirer');

const questions = [
    {
      type : 'input',
      name : 'barcode',
      message : 'Enter barcode ...'
    },
];


program
    .version('0.0.1')
    .description('barcode thingy');

    program
    .command('getBarcode')
    .alias('r')
    .description('Get contact')
    .action(() => {
        prompt(questions).then(answers => 
            getBarcode(answers));
    });


program.parse(process.argv);