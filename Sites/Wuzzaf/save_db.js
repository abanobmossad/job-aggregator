const wuzzaf = require("./fetch_jobs");

// singel job
let uri = `https://wuzzuf.net/jobs/p/146930-Back-End-Developer-Node-js-Python---Django-Tqweem-Masr-Cairo-Egypt?l=dbp&t=sij&o=1`;

// wuzzaf.fetchJob(uri,(job)=>{
//     console.log(job.title);
// })

// full page
// let pageUri = `https://wuzzuf.net/search/jobs`
// wuzzaf.fetchPage(pageUri, (job) => {
//     console.log('------');
// })

// all page s 
wuzzaf.fetchAll(false,(job)=>{
    console.log(job.datePosted);
})