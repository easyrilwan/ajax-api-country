"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          Number(data.population) / 1000000
        ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;
x
  countriesContainer.insertAdjacentHTML("beforeend", html);
  // countriesContainer.style.opacity = 1; // Disable for catch error
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1; // Disable for catch error
};

const getJSON = async function (url, errorMsg = "Something went wrong") {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getCountryData = async function (country) {
  try {
    // Country 1
    const data = await getJSON(
      `https://restcountries.com/v2/name/${country}`,
      "Country not found"
    );
    renderCountry(data[0]);
    console.log(data[0]);

    const neighbour = data[0].borders.at(0);

    if (!neighbour) throw new Error("No neighbour found!");

    // Country 2
    const neighbourData = await getJSON(
      `https://restcountries.com/v2/alpha/${neighbour}`,
      "Country not found"
    );
    renderCountry(neighbourData, "neighbour");
  } catch (err) {
    renderError(`Something went wrong ❌❌❌ ${err.message}. Try again!`);
  } finally {
    countriesContainer.style.opacity = 1;
  }
};

btn.addEventListener("click", async function () {
  await getCountryData("nigeria");
});

/////////////////////////////////
/*******************************/
/////////////////////////////////

/* ASYNC AWAIT */

// const whereAmI = async function (country) {
//   try {
//     const res = await fetch(`https://restcountries.com/v2/name/${country}`);

//     console.log(res);
//     if (!res.ok) throw new Error(`Country not found (${res.status})`);

//     const data = await res.json();
//     console.log(data[0]);

//     renderCountry(data[0]);
//   } catch (error) {
//     console.error(error);
//     renderError(`Something went wrong ❌❌❌ ${error.message}`);
//   }
// };
// whereAmI("nigeria");

// whereAmI("dargre");
