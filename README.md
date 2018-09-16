# job aggregation service made with nodeJs

## with job aggregator you can scrape
- [WUZZAF] website
- [BAYT] website

[WUZZAF]:<https://wuzzuf.net/>
[BAYT]: <https://www.bayt.com>

## Usage
> clone it and use ```npm link```  to link the package 
> and use ```npm link job-aggregator``` to use it in your project 

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

