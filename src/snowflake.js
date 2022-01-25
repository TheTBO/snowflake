

class Snowflake {

    constructor(x, y, p5) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.strokes = [];
        this.speed = Math.random(0.005, 0.01);
    }

    addStroke(stroke) {
        this.strokes.push(stroke);
    }

    show() {
        const p5 = this.p5;
        let oldX = this.x;
        let oldY = this.y;
        for (let i = 0; i < this.strokes.length; i++) {
            let strokePath = this.strokes[i]

            let newX = oldX + strokePath.dx * 0.1;
            let newY = oldY + strokePath.dy * 0.1;

            if (this.strokes[i].pen == "down") {
                p5.stroke(255);
                p5.strokeWeight(2);
                p5.line(oldX, oldY, newX, newY);
            }

            oldX = newX;
            oldY = newY;
            this.y += this.speed;
        }
    }
}


export default Snowflake;