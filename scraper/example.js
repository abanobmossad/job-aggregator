const wuzzaf = require("./fetch_wuzzaf_jobs.js");
const bayt = require("./fetch_bayt_jobs.js");


// singel job
let wuzzafJobLink = `https://wuzzuf.net/jobs/p/146930-Back-End-Developer-Node-js-Python---Django-Tqweem-Masr-Cairo-Egypt?l=dbp&t=sij&o=1`;
let wuzzafPageLink = `https://wuzzuf.net/search/jobs?`;
let baytJobLink = `https://www.bayt.com/en/egypt/jobs/مصمم-جرافيك-السعودية-3836541/`;
let baytPageLink = `https://www.bayt.com/en/egypt/jobs/`;

/*------------------------WUZZAF------------------------*/
/*

// // single job
// wuzzaf.fetchJob(wuzzafJobLink, (job) => {
//     console.log(job.title);
// })

// // full page
// let pageUri = `https://wuzzuf.net/search/jobs`
// wuzzaf.fetchPage(wuzzafPageLink, (job) => {
//     console.log(job.title);
// })

// all pages 
wuzzaf.fetchAll(true,(job)=>{
    console.log(job.title);
})
*/

/*-------------------------------------BAYT----------------------------------*/
// // single job
// bayt.fetchJob(baytJobLink, (job) => {
//     console.log(job);
// })

// full page
bayt.fetchPage(baytPageLink, (job) => {
    console.log(job.title);
})

// // all pages 
// bayt.fetchAll(true,(job)=>{
//     console.log(job.title);
// })