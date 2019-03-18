document.getElementById('bsearch').addEventListener('click', function (event) {
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
    const serachForm = document.forms['search'];
    const imei = escape(serachForm.elements['words'].value);
    const user = JSON.stringify({ words: imei});
    let request = new XMLHttpRequest();
    request.open('POST', '/imei', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', () => {
        console.log(request.response);
        if (request.response.length === 0) {
            document.getElementById('data').innerHTML = '<p class="text-warning"><strong>Заказ не найден!</strong></p>';
        }
        else if (JSON.parse(request.response).imei === undefined) {
            document.getElementById('data').innerHTML = '<p class="text-warning"><strong>Введите ваш номер imei!</strong></p>'
        }
        else {
            document.getElementById('data').innerHTML = `<table class="table table-bordered table-inverse" id = 'searchTable'>
                        <thead>
                            <tr>
                                <th>
                                    Номер imei
                                </th>
                                <th>
                                    Название модели устройства
                                </th>
                                <th>
                                    Готовность заказа(OK/ Not OK)
                                </th>
                                <th>
                                    Стоимость работы
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${JSON.parse(request.response).imei}</td>
                                <td>${JSON.parse(request.response).model}</td>
                                <td>${JSON.parse(request.response).status}</td>
                                <td>${JSON.parse(request.response).cost}</td>
                            </tr>
                        </tbody>
                    </table>`
        }
    });
    request.send(user);
});
