const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/barcode', {useNewUrlParser: true});

let datetime = new Date();
const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric'};
parsedDate = datetime.toLocaleDateString("nl-NL", options)

const visitSchema = mongoose.Schema({
    barcode:    {type: String},
    firstname:  {type: String},
    loginDate:  {type: Date},
    logoutDate: {type: Date},
});

const loginBarcodeDB = mongoose.model('visit', visitSchema);

function UserData() {

    let firstnameInput = document.getElementById("firstnameInput").value;
    let data = firstnameInput.toLowerCase();

    loginBarcodeDB.find({firstname: data}).exec(function(err, visits) {
        visits.forEach(function(value) {
            let _id = value._id;
            let barcode = value.barcode;
            let firstname = value.firstname;

            const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric'};
            let loginDateTime = value.loginDate;
            loginDate = loginDateTime.toLocaleDateString("nl-NL", options);

            if (value.logoutDate === undefined){
                logoutDate = "User is still logged in.";
            } else {
                let logoutDateTime = value.logoutDate;
                logoutDate = logoutDateTime.toLocaleDateString("nl-NL", options);
            };

            let tbody = document.getElementById("tbody");
            tbody.insertAdjacentHTML('afterbegin', '<td id="_id"></td>' + `\n` + '<td id="barcode"></td>' + `\n` + '<td id="firstname"></td>' + `\n` + '<td id="loginDate"></td>' + `\n` + '<td id="logoutDate"></td>');

            document.getElementById("_id").innerHTML = _id;
            document.getElementById("barcode").innerHTML = barcode;
            document.getElementById("firstname").innerHTML = firstname;
            document.getElementById("loginDate").innerHTML = loginDate;
            document.getElementById("logoutDate").innerHTML = logoutDate;
        });
    });
};

