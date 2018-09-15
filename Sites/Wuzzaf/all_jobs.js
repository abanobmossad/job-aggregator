const request = require('request-promise');
const cheerio = require("cheerio");



// request the wuzzaf site and scribing it 
async function jobInfo(start, callback) {

    var options = {
        uri: `https://wuzzuf.net/search/jobs?start=${start}`,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    request(options).then(function ($) {
        // number of all opened jobs
        var no_of_jobs = $('p.no-of-jobs').text();
        //job details list
        $('h2.job-title').find('a').each((index, element) => {
            let jobUrl = $(element).attr("href");
            // redirect to job details page and fetch data
            jobDetails(encodeURI(jobUrl));
        });
        callback(no_of_jobs)
    }).catch(err => {
        console.log(err);

    });
}



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
    }).catch(err => {
        console.log(err);
    });
}

function fillJobs() {
    var counter = 1;
    var clear = setInterval(function () {
        counter += 19;
        jobInfo(counter, (noj) => {
            if (!noj) {
                clearInterval(clear)
            }
        })
    }, 1000);
}

fillJobs()