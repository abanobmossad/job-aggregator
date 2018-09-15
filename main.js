const wuzzaf = require("./scraper/fetch_wuzzaf_jobs");
const bayt = require("./scraper/fetch_bayt_jobs");

module.exports = {
    wuzzaf,
    bayt,
}
let g = `https://www.bayt.com/en/egypt/jobs/?filters%5Bjb_last_modification_date_interval%5D%5B%5D=3&page=0`

console.log(g);
console.log(encodeURI(decodeURIComponent(g)));
