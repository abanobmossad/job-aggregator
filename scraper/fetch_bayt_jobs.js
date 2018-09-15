const request = require('request-promise');
const cheerio = require("cheerio");

/**
 * @description fetch all the job links in single page
 * @param pageUri: the jobs page uri
 * @callback :Save return the found jobs one by one 
 */
// request the wuzzaf site and scribing it 
async function fetchPage(pageUri, save, callback) {
    var options = {
        uri: pageUri,
        transform: function (body) {
            return cheerio.load(body); // to scrap the page (like JQuery)
        },
        followAllRedirects: false
    };
    request(options).then(function ($) {
        // number of all opened jobs
        var no_of_jobs = $('p.no-of-jobs').text();
        //job details list
        $("a[data-js-aid='jobID']").each((index, element) => {
            let jobUri = `https://www.bayt.com` + $(element).attr("href");
            // redirect to job details page and fetch data
            fetchJob(jobUri, save); // encode the Arabic characters
        });

        try {
            callback(no_of_jobs)
        } catch (e) {}
    }).catch(err => {
        console.error("Bayt servers can't handel this  Many requests -429 just skip it :)");
    });
}

/**
 * @description fetch the job details (single job)
 * @param jobUri :string the url (slug) of the job
 * @callback save : return the found job 
 */
function fetchJob(jobUri, save) {
    var options = {
        uri: encodeURI(jobUri),
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    return request(options).then(function ($) {
        let job = Object.create(null);
        let demands = Object.create(null);
        // basics 
        job.title = $(".h3").text();
        job.applyLink = `https://www.bayt.com` + $('#applyLink_1').attr('href');
        job.company_location = $('.t-left').find('ul').find("li:nth-child(2)").text().trim();
        job.company_name = $("span[itemprop='hiringOrganization']").text().trim();
        job.datePosted = new Date($('.t-left').find('ul').find("li:nth-child(3)").find('span:first-child').text().trim());
        demands.type = $(".card").find("div:nth-child(8)").find('dl').find('div:nth-child(5)').find('dd').text().trim();
        demands.salary = $(".card").find("div:nth-child(8)").find('dl').find('div:nth-child(6)').find('dd').text().trim();
        demands.vacancies = $(".card").find("div:nth-child(8)").find('dl').find('div:nth-child(7)').find('dd').text().trim() + " open position";
        $(".card").find("div:nth-child(9)").find('dl').find('div').each((i, element) => {
            let key = $(element).find("dt").text().trim();
            let value = $(element).find("dd").text().trim().replace(/(\r\n\t|\n|\r\t|\s{5,}|\\)/gm, " ");
            demands[key] = value
        });
        job.demands = demands;
        job.desc = $(".card").find("div:nth-child(6)").find('h2').siblings().text().trim()
        job.requirements = $(".card").find("div:nth-child(7)").find('h2').siblings().text().trim()
        job.originalLink = jobUri;
        // save the job in the DataBase 
        save(job)
    }).catch(err => {
        console.error("Bayt servers can't handel this  Many requests -429 just skip it :)");
    });
}

/**
 * @description run the script to scraping all site pages 
 * @param last :boolean fetch the last 24 hours jobs
 * @callback return the found jobs one by one 
 */
function fetchAll(last, save) {
    let url;
    var counter = 0;
    let clear = setInterval(function () {
        url = !last ? `https://www.bayt.com/en/egypt/jobs/?page=${counter}` :
            `https://www.bayt.com/en/egypt/jobs/?options%5Bjb_activation_date%5D%5B%5D=2&YII_CSRF_TOKEN=098921c77a0dd08abb34a221699329042a92971c&page=${counter}`
        fetchPage(url, save, (noj) => {
            if (!noj) {
                clearInterval(clear)
            }
        })
        counter++;
    }, 3000);
}

module.exports = {
    fetchAll,
    fetchJob,
    fetchPage
}