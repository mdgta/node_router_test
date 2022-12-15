import express from "express";
import characters from "../characters.json" assert {type: "json"};

const router = express.Router();

// main characters directory
router.get("/", (request, response) => {
	response.send(
		`<ul>
			${characters.map(character =>
				`<li>${character.name}</li>`
			).join("")}
		</ul>`
	);
});

// character by blood type
router.get("/blood-type", (request, response) => {
	response.status(404).send(`please specify a blood type in the URL`);
});

// character by blood type
router.get("/blood-type/:bloodType", (request, response) => {
	const {bloodType} = request.params;
	// const formattedBloodType = bloodType.toLowerCase().replace(/[a-z]/, m => m.toUpperCase())
	let formattedBloodType = bloodType.toLowerCase();
	formattedBloodType = formattedBloodType.charAt(0).toUpperCase() + formattedBloodType.slice(1);
	const bloodBuddies = characters.filter(char => char.blood === formattedBloodType);
	// response.send("you have requested character id: " + charId);
	console.log(bloodBuddies);
	if (bloodBuddies.length > 0) {
		response.send(
			`<ul>
				${bloodBuddies.map(character =>
					`<li>${character.name}</li>`
				).join("")}
			</ul>`
		);
	}
	response.status(404).send(`no character was found`);
});



router.get("/quidditch", (request, response) => {
	const chars = [...characters];
	// const group1 = chars.splice(0, 6);
	// const group2 = chars.splice(0, 6);
	// const group3 = chars.splice(0, 6);
	// const group4 = chars.splice(0, 6);
	// const referees = chars.splice(0);
	// const object = {
	// 	match1: [group1, group2]
	// };
	const groups = {};
	for (let i = 1; i <= 4; i++) {
		groups["group" + i] = chars.splice(0, 6);
	}
	const {group1, group2, group3, group4} = groups;
	const matches = {
		match1: [group1, group2],
		match2: [group3, group4],
		referees: chars
	}
	// response.setHeader("Content-Type", "application/json");
	response.json(matches);
});


/*

normal:
"13 February, 1981"


others:

"1951",
"Late Agust, 1881",
"Between 1 September 1978 and 31 August 1979",
"In or before 1960",
"4 October"




we want this:


"13 February, 1981"
"Late Agust, 1881"
"4 October"

*/




router.get("/birth/:month", (request, response) => {
	const {month} = request.params;
	const charactersBornOnMonth = characters.filter(char => {
		const {born} = char;
		const dateStructure = born.toLowerCase().split(" ");
		//if (dateStructure.length === 2 || dateStructure.lenght === 3) {
		if ([2, 3].includes(dateStructure.length)) {
			const monthString = dateStructure[1].slice(0, -1);
			return month.toLowerCase() === monthString;
		}
		return false;
	});
	if (charactersBornOnMonth.length > 0) {
		response.send(
			`<ul>
				${charactersBornOnMonth.map(character =>
					`<li>${character.name}</li>`
				).join("")}
			</ul>`
		);
	}
	response.status(404).send("no character was found");
});


export {
	router
};


// character by id
router.get("/:charId", (request, response) => {
	const {charId} = request.params;
	const character = characters.find(char => char.id === Number(charId));
	// response.send("you have requested character id: " + charId);
	if (character) {
		response.send(character.name);
	}
	response.status(404).send(`cannot find character id #${charId}`);
});