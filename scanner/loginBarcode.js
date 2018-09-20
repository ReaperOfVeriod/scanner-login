#!/usr/bin/env node

const program = require('commander');

const { loginBarcode } = require('./main');

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
    .command('loginBarcode')
    .alias('r')
    .description('Get contact')
    .action(() => {
        prompt(questions).then(answers => 
            loginBarcode(answers));
    });


program.parse(process.argv);