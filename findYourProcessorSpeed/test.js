const os = require("os");

const foo = () => {
  const myPC = os.cpus();
  const model = myPC[0].model;
  console.log(model);
  const speed = myPC[0].speed;
  console.log(speed);
};

module.exports.impOS = foo;

// Check processor speed
