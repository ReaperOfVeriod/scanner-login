

// let datetime = new Date();
// //datetime.setDate(datetime.getDate() - 5);

// const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

// console.log(datetime.toLocaleDateString("nl-NL", options));

const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/barcode', {useNewUrlParser: true});

const visitSchema = mongoose.Schema({
    barcode:    {type: String},
    firstname:  {type: String},
    loginDate:  {type: Date},
    logoutDate: {type: Date},
});

const loginBarcodeDB = mongoose.model('visit', visitSchema);

loginBarcodeDB.find({firstname: "peter"}).exec(function(err, visits) {
    visits.forEach(function(value){
        let loginDateTime = value.loginDate;
        let logoutDateTime = value.logoutDate;


        console.log(loginDateTime);
        console.log(logoutDateTime);

        let diffrence = Math.abs(loginDateTime - logoutDateTime);
        // console.log(diffrence);
        // let hours1 = diffrence / 3600000;
        // console.log(hours1);

        let seconds = diffrence / 1000;
        let minutes = seconds / 60;
        let hours = seconds / 3600
        seconds = seconds % 60;
        minutes = minutes % 60;
        console.log(`${hours}:${minutes}:${seconds}`);
    });
});