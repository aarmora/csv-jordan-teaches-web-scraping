import { sampleHtml } from './sample-html';
import cheerio from 'cheerio';
import * as json2csv from 'json2csv';
import * as fs from 'fs';


const $ = cheerio.load(sampleHtml);

// Search by element
const title = $('title').text();

console.log('title', title);

// Search by class
const homeButton = $('.home_link').text();

console.log('Home button', homeButton);

// Search by class and child
const topNavButtons = $('.word-only li').text();

console.log('top nav buttons', topNavButtons);

// Search by property
const pizzaNews = $('a[href="/pizza-news"]').text();

console.log('pizza news', pizzaNews);

// Search by property and find only the first
const firstNavLink = $('li a').first().text();

console.log('first nav link', firstNavLink);

// Search by property and find only the last
const lastNavLink = $('li a').last().text();

console.log('last  nav link', lastNavLink);

// Get propery from element
const funFactsLink = $('.last a').prop('href');

console.log('fun facts link', funFactsLink);

const listElements: any[] = [];

// Access each of a list in a loop
$('li').each(function (index, element) {
	const elementText = $(element).text();
	listElements.push(elementText);
	console.log('this text', $(element).text());
});

const data = {
	titleText: title,
	homeButtonText: homeButton,
	topNavButtonsText: topNavButtons,
	pizzaNewsText: pizzaNews,
	listElementsArray: listElements
};

const csv = json2csv.parse(data);

fs.writeFile('srccc/data.csv', csv, (err) => {
	if (err) {
		return console.log('an error happened while saving the file', err);
	}
	console.log('file saved successfully!');
});
