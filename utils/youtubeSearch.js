const scraper = require("youtube-scrape/scraper").youtube;
module.exports = {
    name: "play",
    description: "Executa uma música",
    async search(onlyOne, searchTerm) {
		const { results } = await scraper(searchTerm);
		//console.log(results);
        if (!onlyOne) {
			try {
				return results.map(parseVideoContentList);
			} catch (error) {
				return;
			}
        } else {
			try {
				return parseVideoContent(results);
			} catch (error) {
				return;
			}
        }
    },
};

function parseVideoContentList(video) {
	const content = video.content;
    if (content.duration != null) {
        let videoInfo = {
            title: `${content.title}`,
            link: content.url,
            duration: content.duration,
            thumbnail: content.thumbnail,
        };
        return videoInfo;
	}
}

function parseVideoContent(results){
	let title = results[0].content.title;
	let videoLink = results[0].content.url;
	let duration = results[0].content.duration;
	let thumbnail = results[0].content.thumbnail;
	let videoInfo = {
		title: title,
		link: videoLink,
		duration: duration,
		thumbnail: thumbnail,
	};
	return videoInfo;
}
