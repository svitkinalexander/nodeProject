document.getElementById('sendMail').addEventListener('click', function (event) {
  event.preventDefault();
  function escape(string) {
    const htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    return string.replace(/[&<>"']/g, function (match) {
      return htmlEscapes[match];
    });
  };
  const serachForm = document.forms['mailTo'];
  const name = escape(serachForm.elements['name'].value);
  const email = escape(serachForm.elements['email'].value);
  const imei = escape(serachForm.elements['imei'].value);
  const device = escape(serachForm.elements['device'].value);
  const message = escape(serachForm.elements['message'].value);
  console.log(name);
  if (!name.match(/\w/)) {
    document.getElementById('success').style.visibility = 'visible';
    return false;
  }
  else if (!email.match(/\w/)) {
    document.getElementById('success').style.visibility = 'visible';
    return false;
  }
  else if (imei === null || imei === '' || imei === undefined) {
    document.getElementById('success').style.visibility = 'visible';
    return false;
  }
  else if (!device.match(/\w/)) {
    document.getElementById('success').style.visibility = 'visible';
    return false;
  }
  else if (!message.match(/\w/)) {
    document.getElementById('success').style.visibility = 'visible';
    return false;
  }
  else {
    const mail = JSON.stringify({ name: name, email: email, imei: imei, device: device, message: message });
    document.getElementById('success').style.visibility = 'hidden';
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
  }
  });