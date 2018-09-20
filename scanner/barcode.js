#!/usr/bin/env node

const program = require('commander');

const { addBarcode } = require('./main');

const { prompt } = require('inquirer');

const questions = [
    {
      type : 'input',
      name : 'barcode',
      message : 'Enter barcode ...'
    },

    {
        type : 'input',
        name : 'firstname',
        message : 'enter firstname ...'
    }
];


program
    .version('0.0.1')
    .description('barcode thingy');

    program
        .command('addBarcode')
        .alias('a')
        .description('add a barcode')
        .action(() => {
            prompt(questions).then(answers => 
                addBarcode(answers));
        });


program.parse(process.argv);
