// 引力・斥力モデル


class attractor {


    constructor(pcount=1000, magnetism= 10.0) {
        this.pcount=pcount
        this.vx = new Array(this.pcount);
        this.vy = new Array(this.pcount);
        this.x = new Array(this.pcount);
        this.y = new Array(this.pcount);
        this.ax = new Array(this.pcount);
        this.ay = new Array(this.pcount);

        this.magnetism = magnetism; //Strength of attractive force If it is negative, it becomes repulsive force.。
        this.radius = 1 ; //Radius of drawing circle
        this.deacceleration = 0.95 //Develerate particle movement
        noStroke();
        fill(0);
        ellipseMode(RADIUS);
        background(0);
        blendMode(ADD);

        for (var i = 0; i < this.pcount; i++) {
            this.x[i] = random(width);
            this.y[i] = random(height);
            this.vx[i] = 0;
            this.vy[i] = 0;
            this.ax[i] = 0;
            this.ay[i] = 0;
        }
    }




    draw() {
        fill(0, 0, 0);
        rect(0, 0, width, height);

        for (var i = 0; i < this.pcount; i++) {
            this.distance = dist(mouseX, mouseY, this.x[i], this.y[i]); //dist(x1,y1,x2,y2) Function for finding the distance between two points
            //Acceleration is inversely proportional to the square of the distance from the center of gravity。
            if (this.distance > 3) { //If you are too close to the mouse, do not update the acceleration
                this.ax[i] =  this.magnetism * (mouseX - this.x[i]) / (this.distance ** 2);
                this.ay[i] =  this.magnetism * (mouseY - this.y[i]) / (this.distance ** 2);
            }
            this.vx[i] += this.ax[i]; // Increase the speed this.vx by this.ax per frame。
            this.vy[i] += this.ay[i]; // Increase the speed this.vy by this.ay only per frame.

            this.vx[i] = this.vx[i] * this.deacceleration;
            this.vy[i] = this.vy[i] * this.deacceleration;

            this.x[i] += this.vx[i];  // Move forward this.vy pixels per frame.。
            this.y[i] += this.vy[i];  // Advance this.vy pixel per frame。

            var velocity = dist(0, 0, this.vx[i], this.vy[i]); // Find velocity from X and Y components of velocity
            var r = map(velocity, 0, 5, 0, 255); //Calculate colors according to speed
            var g = map(velocity, 0, 5, 64, 255);
            var b = map(velocity, 0, 5, 128, 255);
            fill(r, g, b, 32);
            ellipse(this.x[i], this.y[i], this.radius, this.radius);
        }

    }

}