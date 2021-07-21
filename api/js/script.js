const axios = require("axios");

const url = "https://swapi.dev/api/planets/1/";

const foo = async () => {
  const { data } = await axios.get(url);
  console.log(data);
};
foo();

