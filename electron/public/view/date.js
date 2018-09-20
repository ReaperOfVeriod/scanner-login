const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/barcode', {useNewUrlParser: true});

let datetime = new Date();

const month = datetime.getMonth();

let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "oktober", "november", "december"];

const day = datetime.getDay();

const year = datetime.getFullYear();

const parsedDate = `it's ${day} ${months[month]} ${year}`;

//console.log(`it's ${day} ${months[month]} ${year}`);

const visitSchema = mongoose.Schema({
    barcode:    {type: String},
    firstname:  {type: String},
    loginDate:  {type: Date},
    logoutDate: {type: Date},
});

const loginBarcodeDB = mongoose.model('visit', visitSchema);

function UserData() {

    let firstnameInput = document.getElementById("firstnameInput").value;
    loginBarcodeDB.find({firstname: firstnameInput}).exec(function(err, visits) {
        visits.forEach(function(value) {
            let _id = value._id;
            let barcode = value.barcode;
            let firstname = value.firstname;

            let loginDateTime = value.loginDate
            const month = loginDateTime.getMonth()+1;
            const day = loginDateTime.getDay();
            const year = loginDateTime.getFullYear();
            const hour = loginDateTime.getHours();
            const minute = loginDateTime.getMinutes();
            const second = loginDateTime.getSeconds();
            let parsedLoginDateTime = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
            let loginDate = parsedLoginDateTime;

            if (value.logoutDate === undefined){
                logoutDate = "User is still logged in.";
            } else {
                let logoutDateTime = value.logoutDate
                const logoutMonth = logoutDateTime.getMonth()+1;
                const logoutDay = logoutDateTime.getDay();
                const logoutYear = logoutDateTime.getFullYear();
                const logoutHour = logoutDateTime.getHours();
                const logoutMinute = logoutDateTime.getMinutes();
                const logoutSecond = logoutDateTime.getSeconds();
                let parsedLogoutDateTime = `${logoutDay}/${logoutMonth}/${logoutYear} ${logoutHour}:${logoutMinute}:${logoutSecond}`;
                logoutDate = parsedLogoutDateTime;
            };



            // if (value.logoutDate === undefined) {
            //     logoutDate = "User is still logged in.";
            // } else {
            //     logoutDate = value.logoutDate;
            // }

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