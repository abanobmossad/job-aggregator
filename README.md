# job aggregation service made with nodeJs

## with job aggregator you can scrape
- [WUZZAF] website
- [BAYT] website

[WUZZAF]:<https://wuzzuf.net/>
[BAYT]: <https://www.bayt.com>

## Usage
**require the package** 

```const {wuzzaf,bayt} = require('job-aggregator')```

**Wuzzaf**
```
wuzzaf.fetchJob(wuzzafJobLink, (job) => {
    console.log(job.title);
});
```

**Bayt**
```
bayt.fetchJob(baytJobLink, (job) => {
    console.log(job.title);
});
```

