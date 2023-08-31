const axios = require('axios');

const fetchMFData = () => {
    console.log("fetching:", new Date())
    console.log("I am madesh");
    axios.get('https://api.mfapi.in/mf/100029')
        .then(res => {
            console.log("fetched:", new Date())
            // console.log(JSON.stringify(res.data));
        })
        .catch(error => {
            console.log(error.message);
        })
}

const run = () => {
    fetchMFData();
}

module.exports.run = run;