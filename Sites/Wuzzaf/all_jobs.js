const request = require('request-promise');
const cheerio = require("cheerio");


/**
 * @description fesh all the job links single page
 * @param start :number the start page (pagination)
 * @param last :boolean fetch the last 24 hours jobs
 * @callback :function return the number of found opened jobs
 */
// request the wuzzaf site and scribing it 
async function jobInfo(start, last, callback) {
    let url = !last ? `https://wuzzuf.net/search/jobs?start=${start}` :
        `https://wuzzuf.net/search/jobs?start=${start}&filters%5Bpost_date%5D%5B0%5D=Past%2024%20Hours`;

    var options = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body); // to scrap the page (like JQuery)
        }
    };
    request(options).then(function ($) {
        // number of all opened jobs
        var no_of_jobs = $('p.no-of-jobs').text();
        //job details list
        $('h2.job-title').find('a').each((index, element) => {
            let jobUrl = $(element).attr("href");
            // redirect to job details page and fetch data
            jobDetails(encodeURI(jobUrl));// encode the Arabic characters
        });
        callback(no_of_jobs)
    }).catch(err => {
        console.log(err);
    });
}


/**
 * @description fetch the job details (single job)
 * @param jobUrl :string the url (slug) of the job
 */
// fetch data from job details page
const jobDetails = (jobUrl) => {

    var options = {
        uri: jobUrl,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    return request(options).then(function ($) {
        let job = Object.create(null);
        // basics 
        job.title = $("h1.job-title").find('meta').attr("content");
        job.company_location = $("span.job-company-location").find("span[itemprop='addressRegion']").text();
        job.company_name = $("a.job-company-name").text();
        job.datePosted = $("time[itemprop='datePosted']").attr("title");
        job.applicants_num = $('div.applicants-num').text().trim() || "0";
        //more details
        let demands = Object.create(null);
        $(".table").find('dl').each((index, element) => {
            let key = $(element).find("dt").text().trim().replace(":", '');
            let value = $(element).find("dd").text().trim().replace(/(\r\n\t|\n|\r\t|\s{5,}|\\)/gm, " ");
            demands[key] = value;
        })
        job.demands = demands;
        job.desc = $("span[itemprop='description']").text();
        job.requirements = $("span[itemprop='responsibilities']").text();
        console.log(job.title);
        console.log("---------------------------------------------");
        // save the job in the DataBase 

    }).catch(err => {
        console.log(err);
    });
}

/**
 * @description run the script to scraping all site pages 
 * @param last :boolean fetch the last 24 hours jobs
 */
function fillJobs(last) {
    var counter = 0;
    var clear = setInterval(function () {
        jobInfo(counter, last, (noj) => {
            if (!noj) {
                clearInterval(clear)
            }
        })
        counter += 20;
    }, 1000);
}

fillJobs(true)

module.exports.fillJobs;
