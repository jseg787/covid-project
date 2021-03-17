const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.sharp.com/health-classes/volunteer-registration-grossmont-center-covid-19-vaccine-clinic-2558';

(async () => {
	const { data } = await axios.get(url);

	const $ = cheerio.load(data);
	const sections = $('.section-date');

	sections.each((i, el) => {
		const date = $(el).find('.eight.columns > .truss > h2').text();
		const time = $(el).find('.eight.columns > .truss > div:not(.large-cta)').text();
		const address = $(el).find('address').text();
		const status = $(el).find('.one-third.column > .truss').text();

		console.log(date);
		console.log(time);
		console.log(address);
		console.log(status);
		console.log('=================================');
	});
})();
