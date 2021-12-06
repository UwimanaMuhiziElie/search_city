const button = document.querySelector("button");

button.addEventListener("click", () => {
  const text = document.querySelector("input").value.replace(/\s{2,}/g, " ");
  console.log(text);
  document.querySelector("button").innerText = "Searching ...";
  fetch(
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json",
    { method: "GET" }
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(cities) {
      const result = cities.filter(city => {
        if (
          city.city.toLowerCase().includes(text.toLowerCase()) ||
          city.state.toLowerCase().includes(text.toLowerCase())
        ) {
          return city;
        }
      });
      let tbody = "";
      if (result.length === 0)
        document.getElementById("error").innerHTML = "No result found !";
      result.forEach(city => {
        const population = commaSeparator(city.population);
        const growth = city.growth_from_2000_to_2013.split("%")[0];
        const trow = `<tr><td>${city.city}</td>
            <td>${city.state}</td>
            <td>${population}</td>
            <td style="color: ${
              growth >= 0 ? "green" : "red"
            }">${growth} %</td></tr>`;
        tbody += trow;
      });
      document.querySelector("button").innerText = "Search";

      document.getElementById("tbody").innerHTML = tbody;
    });
});

const commaSeparator = number => {
  const str = number.toString();
  const len = str.length;

  const numberCommas = len / 3;

  if (numberCommas < 1) {
    return number;
  }
  let i = 0;
  const arr = str.split("").map(e => {
    i++;
    if (i % 3 === 0 && i !== len) return `,${e}`;
    return e;
  });
  return arr.join("");
};
