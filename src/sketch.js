import Snowflake from './snowflake';
import p5 from 'p5';
import ml5 from 'ml5';

new p5((p5)=>{
	let snowflakes = [];
	let snowflake;
	let model;

	function gotSketch(err, s) {
		if (err) {
			console.error(err);
		} else {
			if (s.pen === "end") {
				snowflake.strokes.push(s);
				snowflakes.push(snowflake);
				snowflake = new Snowflake(Math.random(-p5.width / 2, p5.width / 2), -p5.height / 2 - 100, p5);
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

	p5.setup = () => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight);
		model = ml5.sketchRNN("snowflake", () => {
			console.log("Model Ready");
		});

		model.reset();
		model.generate(gotSketch);

		snowflake = new Snowflake( Math.random(-p5.width / 2, p5.width / 2), -p5.height / 2 - 100 );

		p5.background(100);
	}

	p5.draw = () => {
		p5.translate(p5.width / 2, p5.height / 2)
		p5.background(100);
		generateSnowFlake();
		for (let i = 0; i < snowflakes.length; i++) {
			snowflakes[i].show();
			if (snowflakes[i].y > p5.height + 100) {
				snowflakes.splice(i, 1);
			}
		}

	}
})

