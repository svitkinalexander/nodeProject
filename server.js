const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
let app = express();
app.use(express.static(__dirname + '/public'));
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
            user: 'ieghor-popov-2000@mail.ru',
            pass: 'GB6K824a'
        }
    });

    const mailOptions = {
        from: 'My Site <ieghor-popov-2000@mail.ru>',
        to: 'ieghor-popov-2000@mail.ru',
        subject: '',
        text: '',
        html: `<b>${request.body.userName} - ${request.body.userAge}</b>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
        transporter.close();
    });
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.get("/", function (request, response) {
    response.send("Главная страница");
});

app.listen(8080);
console.log('Server running on port 8080.');



