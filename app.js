const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
require('dotenv').config();

// const url = 'https://www.sharp.com/health-classes/volunteer-registration-grossmont-center-covid-19-vaccine-clinic-2558';

// const getData = async () => {
// 	const { data } = await axios.get(url);

// 	const $ = cheerio.load(data);
// 	const sections = $('.section-date');

// 	sections.each((i, el) => {
// 		const date = $(el).find('.eight.columns > .truss > h2').text();
// 		const time = $(el).find('.eight.columns > .truss > div:not(.large-cta)').text();
// 		const address = $(el).find('address').text();
// 		const status = $(el).find('.one-third.column > .truss').text();

// 		return { date, time, address, status };
// 	});
// };

// setInterval(getData, 5 * 60000);

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_NAME,
		pass: process.env.EMAIL_PASSWORD
	}
});

const mailOptions = {
	from: process.env.EMAIL_NAME,
	to: 'arandomname@exmaple.com',
	subject: 'Testing',
	text: 'This is a test of nodemailer'
};

transporter
	.sendMail(mailOptions)
	.then((res) => console.log('message sent'))
	.catch((err) => console.log('there was an error\n', err));
