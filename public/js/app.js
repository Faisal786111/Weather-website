console.log("Client Side JavaScript is loaded!!");

fetch("https://puzzle.mead.io/puzzle")
  .then((response) => {
    return response.json(); // Fix: Added return statement
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2"); // Fix: Corrected typo

messageOne.textContent = "Client JavaScript"; // Fix: Corrected typo

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  console.log("Form is successfully submitted!!");
  console.log(location);

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      return response.json(); // Fix: Added return statement
    }
  ).then((data) => {
    if (data.error) {
      messageOne.textContent = data.error;
    } else {
      console.log(data.location);
      console.log(data.forecastData);
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecastData;
    }
  }).catch((error) => {
    console.log(error);
  });
});
