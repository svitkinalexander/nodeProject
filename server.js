const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const jsonParser = express.json();
const app = express();
const connection = mysql.createConnection({
    host: "us-cdbr-iron-east-03.cleardb.net",
    user: "b19cd822bf8582",
    password: "bc3ac634",
    database: 'heroku_0797947479f038e'
});

app.use(express.static(__dirname + '/public'));
app.get("/imei", jsonParser, function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post("/imei", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    connection.query(`SELECT * FROM Remont WHERE imei = ${request.body.words};`, function (error, result) {
         if (error) {
             return response.status(400).json({ error: error.message });
        };
        console.log('result: ', result[0]);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(result[0])); 
    });
});

app.get("/register", jsonParser, function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post("/register", jsonParser, function (request, response) {
    connection.query(`INSERT INTO Remont (imei, model, status, cost) VALUES ('${request.body.imei}', '${request.body.device}', 'Not OK', '20 BYN')`, function (error) {
        if (error) {
            return response.status(400).json({ error: error.message });
        };
        console.log('Table successfully updated!');
    });
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, //true --> will use ssl
        auth: {
            user: 'ieghor-popov-2000@mail.ru',
            pass: 'Gb7k854A'
        }
    });

    const mailOptions = {
        from: 'My Site <ieghor-popov-2000@mail.ru>',
        to: 'ieghor-popov-2000@mail.ru',
        subject: '?????????????????? ?? ??????????',
        text: '??????????????',
        html: `<b>Name:<b> ${request.body.name};<br>
               <b>Email:<b> ${request.body.email};<br>
               <b>Imei:<b> ${request.body.imei};<br>
               <b>????????????????????:<b> ${request.body.device};<br>
               <b>??????????????:<b> ${request.body.message};<br>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
        transporter.close();
    });

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(); 
});

 app.get("/", function (request, response) {
    response.send("?????????????? ????????????????");
}); 

app.listen(process.env.PORT || 8080);
console.log('Server running on port 8080.');