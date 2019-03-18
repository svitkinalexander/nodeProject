let today = new Date().getDate();
let week;
if (new Date().getDay() < 3) {
    week = Math.ceil((today + new Date().getDay() - 2) / 7 + 1);
}
else {
    week = Math.floor((today + new Date().getDay() - 2) / 7 + 1);
}

fetch('share.json')
    .then(response => {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
        }
        else {
            return response.json();  
        }
    })
    .then(share => {
        console.log(share);
        const arr = share;
        for (let i = 0; i < arr.length; i++){
            if (week === arr[i].week) {
                document.getElementById('share').innerText = `${arr[i].share}`;
            }
        }
    })