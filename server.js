const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const fs = require('fs');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
let app = express();
app.use(express.static(__dirname + '/public'));
app.get("/imei", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/imei.html");
});

app.post("/imei", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'remontdb'
    });

     connection.query('SELECT * FROM Remont;', function (error, result, fields) {
         if (error) {
             return response.status(400).json({ error: error.message });
        };
        console.log('result: ', result);
          response.render('data.hbs', { data: JSON.stringify(result)});
         //response.end(JSON.stringify(result)); 
         //return response.render('data.hbs', { data: JSON.stringify(result)});//{{data.result}}
    });
});

app.get("/register", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/register.html");
});
app.post("/register", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, //true --> will use ssl
        auth: {
            user: 'youmail',
            pass: 'youpassword'
        }
    });

    const mailOptions = {
        from: 'My Site <ieghor-popov-2000@mail.ru>',
        to: 'ieghor-popov-2000@mail.ru',
        subject: 'Сообщение с сайта',
        text: 'Поломка',
        html: `<b>Name:<b> ${request.body.name};<br>
               <b>Email:<b> ${request.body.email};<br>
               <b>Поломка:<b> ${request.body.message};<br>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
        transporter.close();
    });
    /* response.send(); */
    response.writeHead(302, {
        'Location': 'index.html'
    });
    response.end();
});

app.get("/", function (request, response) {
    response.send("Главная страница");
});

app.listen(process.env.PORT || 8080);
console.log('Server running on port 8080.');