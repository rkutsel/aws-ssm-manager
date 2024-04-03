// THIS CONFIG FILE CONTAINS DEFAULT CONFIGURATION VALUES
import gradient from "gradient-string";

const greeting = `
 ===============================
 +-+-+-+ +-+-+-+ +-+-+-+-+-+-+-+
 |A|W|S| |S|S|M| |M|A|N|A|G|E|R|
 +-+-+-+ +-+-+-+ +-+-+-+-+-+-+-+
 ===============================
`;

const customGradient = gradient([
	{ r: 0, g: 255, b: 100 }, // RGB object
	{ h: 255, s: 1, v: 1, a: 1 }, // HSVa object
	"rgb(120, 120, 0)", // RGB CSS string
	"red", // named color
]);

function getDate() {
	const date = new Date().toLocaleString()
	return date
}

export const ssmConfigOptions = {
	format: { json: "JSON", text: "Text", file: "Save To File" },
	regions: ["US-WEST-2", "US-EAST-1", "EU-WEST-1"],
	tier: "Standard", //Standard | Advanced | Intelligent-Tiering
	override: false,
	outputDir: "./output",
	greeting: console.log(customGradient(greeting)),
	timestamp: getDate()
};
