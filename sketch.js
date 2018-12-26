let snowflakes = [];
let snowflake;
let model;

function setup() {
	createCanvas(windowWidth, windowHeight);
	model = ml5.SketchRNN("snowflake", () => {
		console.log("Model Ready");
		model.reset();
		model.generate(gotSketch);
	});

	snowflake = new SnowFlake(random(-width / 2, width / 2), -height / 2 - 100);

	background(100);
}

function gotSketch(err, s) {
	if (err) {
		console.error(err);
	} else {
		if (s.pen === "end") {
			snowflake.strokes.push(s);
			snowflakes.push(snowflake);
			snowflake = new SnowFlake(random(-width / 2, width / 2), -height / 2 - 100);
			model.reset();

		} else {
			snowflake.strokes.push(s);
		}
	}
}

function generateSnowFlake() {
	if (snowflakes.length < 100) {
		model.generate(gotSketch);
	}
}

function draw() {
	translate(width / 2, height / 2)
	background(100);
	generateSnowFlake();
	for (let i = 0; i < snowflakes.length; i++) {
		snowflakes[i].show();
		if (snowflakes[i].y > height + 100) {
			snowflakes.splice(i, 1);
		}
	}

}