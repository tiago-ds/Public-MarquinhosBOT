const ytsr = require("ytsr");
const { time } = require("console");
const { link } = require("fs");
const scraper = require("./../scrapper/scraper").youtube;
module.exports = {
    search(onlyOne, searchTerm) {
        return new Promise((resolve, reject) => {
            scraper(searchTerm)
                .then((searchResults) => {
                    if (!onlyOne) {
                        try {
                            resolve(searchResults.results);
                        } catch (err) {
                            console.log(err);
                            reject(err);
                        }
                    } else {
                        try {
                            resolve(searchResults.results.filter((element) => {
                                return element.video != undefined;
                            })[0]);
                        } catch (err) {
                            console.log(err);
                            reject(err);
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        });
    }
};
