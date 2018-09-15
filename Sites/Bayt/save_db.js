

const wuzzaf = require("./fetch_jobs");

// singel job
// let uri = `https://www.bayt.com/en/egypt/jobs/civil-engineer-3836746/`

// wuzzaf.fetchJob(uri,(job)=>{
//     console.log(job);
// })

// // full page
// let pageUri = `https://www.bayt.com/en/egypt/jobs/`
// wuzzaf.fetchPage(pageUri, (job) => {
//     console.log(job.title);
// })

// all pages
wuzzaf.fetchAll(true, (job) => {
    // console.log(job.title);
})