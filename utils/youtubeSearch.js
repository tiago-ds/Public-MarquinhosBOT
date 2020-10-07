const fileEdit = require("./fileEdit");
const ytsr = require("ytsr");
const { time } = require("console");
const { link } = require("fs");
module.exports = {
    name: "play",
    description: "Executa uma música",
    search(onlyOne, searchTerm) {
        return new Promise((resolve, reject) => {
            ytsr.getFilters(searchTerm)
                .then(async (filters) => {
                    filter = filters
                        .get("Type")
                        .find((o) => o.name === "Video");
                    const filters2 = await ytsr.getFilters(filter.ref);
                    filter2 = filters2
                        .get("Duration")
                        .find((o) => o.name.startsWith("Short"));
                    const options = {
                        limit: 15,
                        nextpageRef: filter2.ref,
                    };
                    const searchResults = await ytsr(null, options);
                    if (!onlyOne) {
                        try {
                            videoList = searchResults.items.map((video) => {
                                if (video.duration != null) {
                                    let videoInfo = {
                                        title: video.title,
                                        link: video.link,
                                        duration: video.duration,
                                        thumbnail: video.thumbnail,
                                    };
                                    return videoInfo;
                                }
                            });
                            resolve(videoList);
                        } catch (err) {
                            reject(err);
                        }
                    } else {
                        try {
                            let title = searchResults.items[0].title;
                            let videoLink = searchResults.items[0].link;
                            let duration = searchResults.items[0].duration;
                            let thumbnail = searchResults.items[0].thumbnail;
                            let videoInfo = {
                                title: title,
                                link: videoLink,
                                duration: duration,
                                thumbnail: thumbnail,
                            };
                            resolve(videoInfo);
                        } catch (err) {
                            reject(err);
                        }
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    },
};
