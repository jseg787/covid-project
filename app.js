const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
require('dotenv').config();

const url = 'https://www.sharp.com/health-classes/volunteer-registration-grossmont-center-covid-19-vaccine-clinic-2558';

async function main() {
	const results = await getData();
	const openings = checkData(results);

	if (openings.length > 0) {
		console.log('There are openings');
		sendEmailNotification(openings);
	} else {
		console.log('There are no openings');
	}
}

async function getData() {
	const { data } = await axios.get(url);

	const $ = cheerio.load(data);
	const sections = $('.section-date');
	const results = [];

	sections.each((i, el) => {
		const date = $(el).find('.eight.columns > .truss > h2').text();
		const time = $(el).find('.eight.columns > .truss > div:not(.large-cta)').text();
		const address = $(el).find('address').text();
		const status = $(el).find('.one-third.column > .truss').text();

		results.push({ date, time, address, status });
	});

	return results;
}

function checkData(data) {
	const openings = [];

	data.forEach((el) => {
		const status = el.status.trim();

		if (status === 'More Info' || status === 'Classes and Events') {
			openings.push(el);
		}
	});

	return openings;
}

async function sendEmailNotification(openings) {
	let msgText =
		'There is an open class or event for Volunteer Registration: Grossmont Center COVID-19 Vaccine Clinic\n';

	// opening has { date, time, address, status }
	openings.forEach((el) => {
		const openingMsg = `Event on ${el.date} from ${el.time} \nat location ${el.address.trim()}\nhas status ${el.status.trim()}\n\n`;
		msgText += openingMsg;
	});

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_NAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	const mailOptions = {
		from: process.env.EMAIL_NAME,
		to: 'example@examplemail.com',
		subject: 'There is an open class or event for Volunteer Registration: Grossmont Center COVID-19 Vaccine Clinic',
		text: msgText
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log('Message sent');
	} catch (err) {
		console.log('An Error Occurred');
		console.log(err);
	}
}

main();

setInterval(main(), 5 * 60000);
