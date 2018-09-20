const MongoClient = require('mongoose');
const assert = require('assert');
MongoClient.Promise = global.Promise;

const db = MongoClient.connect('mongodb://localhost:27017/barcode', {useNewUrlParser: true})


// Converts value to lowercase
function toLower(v) {
    return v.toLowerCase();
}

const barcodeSchema = MongoClient.Schema({
    barcode:    {type: String, set: toLower},
    firstname:  {type: String, set: toLower},
    creationDate:       {type: Date, default: Date.now}
});

const Barcode = MongoClient.model('Barcode', barcodeSchema);

  //create user
  const addBarcode = (barcode) => {
    Barcode.create(barcode, (err) => {
      assert.equal(null, err);
      console.info('New barcode added');
      process.exit(1);
    });
  };
  //search user
  const getBarcode = (input) => {
    Barcode.find({barcode: input.barcode })
    .exec((err, data) => {
      assert.equal(null, err);
      console.info(data);
      console.info(`${data.length} matches`);
      process.exit(1);
    });
  };

  const visitSchema = MongoClient.Schema({
    barcode:    {type: String, set: toLower},
    firstname:  {type: String, set: toLower},
    loginDate:  {type: Date, default: Date.now},
    logoutDate: {type: Date},
  });

  const loginBarcodeDB = MongoClient.model('visit', visitSchema);

  //login and logout a user
  const loginBarcode = (input) => {
    Barcode.findOne({barcode: input.barcode })
    .exec((err, data) => {
      assert.equal(null, err);
      //console.log(data);
      if (data == null){
        console.log('user does not exist');
        process.exit(1);
      } else {
        loginBarcodeDB.findOne({barcode: input.barcode, logoutDate: {$exists: false}}).exec((err, existing) => {
          if(existing) {
            console.log(`${data.firstname} Already logged in`);
            loginBarcodeDB.updateOne({_id: existing._id}, {
              $set: {
                logoutDate: Date.now()
              }
            }).then((err) => {
              console.log(`${data.firstname} logged out`)
              process.exit(1);
            });
          } else {
            loginBarcodeDB.create({
              barcode: data.barcode,
              firstname: data.firstname
            }, (err) => {
              assert.equal(null, err);
              console.log(`${data.firstname} logged in`);
              process.exit(1);
            });
          };
        });
      };
    });
  };

  

  module.exports = { addBarcode, getBarcode, loginBarcode };