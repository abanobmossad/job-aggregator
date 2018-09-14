const request = require('request');
const cheerio = require("cheerio");



// request the wuzzaf site and scribing it 
const jobInfo = (start, callback) => {
    const url = `https://wuzzuf.net/search/jobs?start=${start}`
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // container for all jobs
            var jobsList = Object.create(null);
            var $ = cheerio.load(body);
            // number of all opened jobs
            var no_of_jobs = $('p.no-of-jobs').text()
            jobsList.no_of_jobs = no_of_jobs;
            //job details list
            $('h2.job-title').find('a').each((index, element) => {
                let jobUrl = $(element).attr("href");
                // redirect to job details page and fetch data
                jobDetails(jobUrl)
            });
        } else {
            console.error(error);
        }
    });
}

// fetch data from job details page
const jobDetails = (jobUrl) => {
    request(jobUrl, (error, response, body) => {
        if (error && response.statusCode != 200) return console.error(error);
        var $ = cheerio.load(body);
        // basics 
        let title = $("h1.job-title").find('meta').attr("content");
        let company_location = $("span.job-company-location").find("span[itemprop='addressRegion']").text();
        let company_name = $("a.job-company-name").text();
        let datePosted = $("time[itemprop='datePosted']").attr("title");
        let applicants_num = $('div.applicants-num').text().trim() || "0";
        //more details
        let demands = Object.create(null);
        $(".table").find('dl').each((index, element) => {
            let key = $(element).find("dt").text().trim().replace(":", '');
            let value = $(element).find("dd").text().trim().replace(/(\r\n\t|\n|\r\t|\s{5,}|\\)/gm, " ");
            demands[key] = value;
        })
        let desc = $("span[itemprop='description']").text();
        let requirements = $("span[itemprop='responsibilities']").text();

        console.log(applicants_num);

        console.log("==========================");

    })
}

jobInfo(1)