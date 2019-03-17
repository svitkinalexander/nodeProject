document.getElementById('sendMail').addEventListener('click', function (event) {
    event.preventDefault();
    const serachForm = document.forms['mailTo'];
    const name = serachForm.elements['name'].value;
    const email = serachForm.elements['email'].value;
    const imei = serachForm.elements['imei'].value;
    const device = serachForm.elements['device'].value;
    const message = serachForm.elements['message'].value;
    const mail = JSON.stringify({ name: name, email: email, imei: imei, device: device, message: message});
    let request = new XMLHttpRequest();
    request.open('POST', '/register', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', () => {
      console.log('send!');
      serachForm.elements['name'].value = null;
      serachForm.elements['email'].value = null;
      serachForm.elements['imei'].value = null;
      serachForm.elements['device'].value = null;
      serachForm.elements['message'].value = null;
    });
    request.send(mail);
});