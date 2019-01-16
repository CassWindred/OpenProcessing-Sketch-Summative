class Attractor {
    get basecolour() {
        return this._basecolour;
    }

    set basecolour(value) {
        this._basecolour = color(value);
    }
    get deceleration() {
        return this._deceleration;
    }

    set deceleration(value) {
        this._deceleration = value;
    }
    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
    }
    get oscillationspeed() {
        return this._oscillationspeed;
    }

    set oscillationspeed(value) {
        console.log('SETTING OSCILATION TO ', value);

        this._oscillationspeed = value;
    }
    get oscillatemax() {
        return this._oscillatemax;
    }

    set oscillatemax(value) {
        this._oscillatemax = value;
    }
    get traillength() {
        return this._traillength;
    }

    set traillength(value) {
        this._traillength = value;
    }
    get blendmode() {
        return this._blendmode;
    }

    set blendmode(value) {
        this._blendmode = value;
    }
    get opacity() {
        return this._opacity;
    }

    set opacity(value) {
        this._opacity = value;
    }
    get velocity() {
        return this._velocity;
    }

    set velocity(value) {
        this._velocity = value;
    }
    get trail() {
        return this._trail;
    }

    set trail(value) {
        this._trail = value;
    }
    get pcount() {
        return this._pcount;
    }

    set pcount(newcount) {
        while (this.x.length < newcount){ //Add points
            this.x.push(random(width));
            this.y.push(random(height));
            this.vx.push(0);
            this.vy.push(0);
            this.ax.push(0);
            this.ay.push(0);
        }

        while (this.x.length > newcount){ //Remove points starting with the most recently made
            this.x.pop();
            this.y.pop();
            this.vx.pop();
            this.vy.pop();
            this.ax.pop();
            this.ay.pop();


        }

        this._pcount=newcount; //Set _pcount to new value
    }


    get outlinecolour() {
        return this._outlinecolour;
    }

    set outlinecolour(value) {
        this._outlinecolour = value;
        if (this.outline===true){
            stroke(value);
        }
    }
    get outline() {
        return this._outline;
    }

    set outline(value) {
        this._outline = value;
        if (value===true){
            stroke(this._outlinecolour);
        }
        else{
            noStroke();
        }

    }




    constructor(pcount=1000, magnetism= 10.0, trail=true) {

        this._pcount=parseInt(pcount, 10); // Set values to their default values
        this._trail=trail;
        this._outline=false;
        this._outlinecolour='red';
        this._velocity=1.0; //velocity modifier
        this._opacity=32;
        this._blendmode=ADD;
        this._traillength=100.0;
        this._basecolour=color('#004080');

        //The following section creates 6 arrays, each of which stores information for each particle
        // For example vx[0] stores the x-axis velocity of the 0th particle in the  and ay[0] stores the y-axis acceleration of the same particle.
        this.vx = new Array(this._pcount); // Array of velocities in the x axis
        this.vy = new Array(this._pcount); // Array of velocities in the y axis
        this.x = new Array(this._pcount); // Array of positions in the x axis
        this.y = new Array(this._pcount);// Array of positions in the y axis
        this.ax = new Array(this._pcount);// Array of acceleration values in the x axis
        this.ay = new Array(this._pcount);// Array of acceleration values in the y axis

        this._oscillatemax=1; //Defines the max number of pixels the size oscilates away from radius
        this._oscillationspeed=0; //Defines the speed at which the particles oscilate
        this.oscillationpoint=0; //Defines the point along the sine curve the oscilation is at

        this._magnetism = magnetism; //Strength of attractive force If it is negative, it becomes repulsive force.。
        this._radius = 1 ; //Radius of drawing circle
        this._deceleration = 0.95; //Develerate particle movement

        this.backgroundcycle=true; //This allows the trail-removing rectangle draw to only happen every other cycle.


        for (let i = 0; i < this._pcount; i++) { //This generates starting values for every particle
            this.x[i] = random(width);
            this.y[i] = random(height);
            this.vx[i] = 0;
            this.vy[i] = 0;
            this.ax[i] = 0;
            this.ay[i] = 0;

        }
    }



    addparticle(x=mouseX,y=mouseY) { //This adds a new particle at the position given, defaulting to the mouse position
        this.x.push(x);
        this.y.push(y);
        this.vx.push(0);
        this.vy.push(0);
        this.ax.push(0);
        this.ay.push(0);
        this._pcount=this._pcount+1;
    }




    draw(ren) { //This should be called every draw cycle. r is a renderer object that can be passed

        if (ren){
            ren.background(0);
            ren.blendMode(this._blendmode);
            ren.fill(0);
            ren.ellipseMode(RADIUS);
            if (this._outline===false){ //This adjusts the outline according to parameters
                noStroke();
            }
            else{
                stroke(this._outlinecolour);
            }
        }
        else{
            background(0);
            blendMode(this._blendmode);
            fill(0);
            ellipseMode(RADIUS);
            if (this._outline===false){//This adjusts the outline according to parameters
                noStroke();
            }
            else{
                stroke(this._outlinecolour);
            }

        }

        if (this._traillength<100 && this.backgroundcycle) { //This should only occur every other draw cycle, thus allowing greater opacity without removing all trails
            if (!ren) {
                let fillopacity = 40 - (map(this._traillength, 0, 100, 0, 40));//This uses the trail length given to calculate an opacity in which to draw a rectangle and obscure the length
                fill(0, fillopacity);
                blendMode(BLEND);
                rect(0, 0, width, height);
                blendMode(this._blendmode);

            }
            else{
                let fillopacity = 40 - (map(this._traillength, 0, 100, 0, 40));//This uses the trail length given to calculate an opacity in which to draw a rectangle and obscure the length
                ren.fill(0, fillopacity);
                ren.blendMode(BLEND);
                ren.rect(0, 0, width, height);
                ren.blendMode(this._blendmode);
            }
        }

        this.backgroundcycle=!this.backgroundcycle; //Swaps the value of the background cycle

        console.log(this._oscillationspeed);
        if (this._oscillatemax>0 && this._oscillationspeed>0){ //Causes the point to oscilate between two sizes based on a sine curve
            console.log('OSCILLATING');
            this.cradius=this._radius+(sin(this.oscillationpoint)*this._oscillatemax);
            console.log(this.cradius);
            if (this.oscillationpoint>=360-this._oscillationspeed){ //Prevents oscillationpoint from going above 360
                this.oscillationpoint=Math.abs(this._oscillationspeed);
            }
            else {
                this.oscillationpoint += Math.abs(this._oscillationspeed);
            }
            if (this.cradius<0){
                this.cradius=0;
            }
        }
        else{
            this.cradius=this._radius;
        }
        if (!this._trail) { //This clears the entire canvas depending on trail parameter
            if (ren) {
                ren.clear();
                ren.background('black');
            }
            else {
                clear();
                background('black');
            }
        }


        for (let i = 0; i < this._pcount; i++) {
            this.distance = dist(mouseX, mouseY, this.x[i], this.y[i]); //dist(x1,y1,x2,y2) Function for finding the distance between two points
            //Acceleration is inversely proportional to the square of the distance from the center of gravity。
            if (this.distance > 3) { //If you are too close to the mouse, do not update the acceleration
                this.ax[i] =  this._magnetism * (mouseX - this.x[i]) / (Math.pow(this.distance, 2));
                this.ay[i] =  this._magnetism * (mouseY - this.y[i]) / (Math.pow(this.distance, 2));
            }
            this.vx[i] += this.ax[i]; // Increase the speed this.vx by this.ax per frame。
            this.vy[i] += this.ay[i]; // Increase the speed this.vy by this.ay only per frame.

            this.vx[i] = this.vx[i] * this._deceleration ;
            this.vy[i] = this.vy[i] * this._deceleration ;

            this.x[i] += this.vx[i]*this._velocity;  // Move forward this.vy pixels per frame.
            this.y[i] += this.vy[i]*this._velocity;  // Move forward this.vy pixels per frame.

            const velocity = dist(0, 0, this.vx[i], this.vy[i]); // Find velocity from X and Y components of velocity
            const r = map(velocity, 0, 5, red(this.basecolour), 255); //Calculate colors according to speed
            const g = map(velocity, 0, 5, green(this.basecolour), 255);
            const b = map(velocity, 0, 5, blue(this.basecolour), 255);

            if (ren) {
                ren.fill(r, g, b, this._opacity);
                ren.ellipse(this.x[i], this.y[i], this.cradius, this.cradius);
            }
            else{
                fill(r, g, b, this._opacity);
                ellipse(this.x[i], this.y[i], this.cradius, this.cradius);
            }
        }




    }



}


