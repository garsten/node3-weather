console.log('app js file in public');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'finding weather forecast...';
    fetch('http://localhost:3000/weather?city='+search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageTwo.textContent = data.error;
            } else {
                console.log(data.forecast);
                messageTwo.textContent = data.forecast;
            }
            messageOne.textContent = '';
        })
    });
    
});
