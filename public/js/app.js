console.log("Hello from express server..!");

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');

const messageOne = document.querySelector('#firstMsg');
const messageTwo = document.querySelector('#secondMsg');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    const inputLocation = input.value;

    fetch("http://localhost:3000/weather?address=" + inputLocation).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                // console.log(data.error);
                messageOne.textContent = data.error;
            }
            else{
                // console.log(data.location);
                // console.log(data.forecast);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});