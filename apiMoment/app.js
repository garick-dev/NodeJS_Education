const moment = require("moment");

let mom = moment();
let b = moment([1997, 01, 07]);

let years = mom.diff(b, "years");
// let months = moment().add(years).moment().a.diff(b, "month");
// let days = years + months + a.diff(b, "days");

console.log(years);
