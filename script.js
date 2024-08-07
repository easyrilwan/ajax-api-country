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

  countriesContainer.insertAdjacentHTML("beforeend", html);
  // countriesContainer.style.opacity = 1; // Disable for catch error
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1; // Disable for catch error
};

///////////////////////////////////////
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    // console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          Number(data.population) / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData("nigeria");
getCountryData("portugal");
getCountryData("ukraine");
*/

// V3
///////////////////////////////////////
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    // console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
   <article class="country">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          Number(data.population) / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
      </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData("nigeria");
getCountryData("portugal");
getCountryData("usa");
*/

///////////////////////////////////////
// Welcome to Callback Hell

/*
const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          Number(data.population) / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, "neighbour");
    });
  });
};

getCountryAndNeighbour("portugal");
// getCountryAndNeighbour("nigeria");
*/

// const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();

//////////////////////
// Promise

// const request = fetch("https://restcountries.com/v2/name/argentina");
// console.log(request);

/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};
*/

/* Simplified */
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((response) => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then((data) => {
//       console.log(data[0]);
//       renderCountry(data[0]);

//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then((response) => response.json())
//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((err) => {
//       console.error(`${err} ❌❌❌`);
//       renderError(`Something went wrong ❌❌❌ ${err.message}. Try again!`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener("click", function () {
//   getCountryData("spain");
// });

// getCountryData("fdoja");

/* Simplified 2 with Throw new Error*/
/*
const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data[0]);
      console.log(data[0]);

      const neighbour = data[0].borders.at(0);

      if (!neighbour) throw new Error("No neighbour found!");

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Country not found"
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      renderError(`Something went wrong ❌❌❌ ${err}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", function () {
  getCountryData("jamaica");
});

getCountryData("Holl");
*/

/* Building Simple Promise */
// const lotteryPromise = new Promise((resolve, reject) => {
//   if (Math.random() >= 0.5) {
//     resolve("You WIN 🎉🎉🎉");
//   } else {
//     reject("You LOST 💔💔💔");
//   }
// });

// lotteryPromise
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

/*
// Introducing Asychronous
const lotteryPromise = new Promise((resolve, reject) => {
  console.log("Lottery draw in progress ⏲️");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("You WIN 🎉🎉🎉");
    } else {
      reject(new Error("You LOST 💔💔💔"));
    }
  }, 2000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// Promisifying SetTimout
const wait = function (seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log("1 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("2 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("3 second passed");
    return wait(1);
  })
  .then(() => console.log("4 second passed"));

Promise.resolve("abc").then((x) => console.log(x));
Promise.reject(new Error("Problem!")).catch((x) => console.error(x));
*/

/* ASYNC AWAIT */
/*
const whereAmI = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);

    console.log(res);
    if (!res.ok) throw new Error(`Country not found (${res.status})`);

    const data = await res.json();
    console.log(data);

    renderCountry(data[0]);
  } catch (error) {
    console.error(error);
    renderError(`Something went wrong ❌❌❌ ${error.message}`);
  }
};
whereAmI("nigeria");
// whereAmI("dargre");
console.log("first");
*/

// try {
//   let x = 1;
//   const z = 3;
//   x = 5;
// } catch (error) {console.error("check")}

/*
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log([data1.capital, data2.capital, data3.capital]);
  } catch (error) {
    console.error(error);
  }
};

get3Countries("nigeria", "ghana", "portugal");
*/

/*
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data);
    console.log(data.map((d) => d[0].capital)); // Return all Array(Capital)
  } catch (error) {
    console.error(error);
  }
};
get3Countries("nigeria", "ghana", "portugal");
*/

/*
// Promise.race (Short Circuit)
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/france`),
    getJSON(`https://restcountries.com/v2/name/argentina`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("Request took too long!"));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(5),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));

// Promise.allSettled (Never Short Circuit)
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
]).then((res) => console.log(res));

Promise.all([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// Promise.any [ES2021]
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
*/

 /* AI Asyn Await */
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

    const neighbour = data[0].borders[0];

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
  await getCountryData(prompt("Enter any country name"));
});
