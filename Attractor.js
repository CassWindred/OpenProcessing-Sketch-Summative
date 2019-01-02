// 引力・斥力モデル


class Attractor {
    get outlinecolour() {
        return this._outlinecolour;
    }

    set outlinecolour(value) {
        this._outlinecolour = value;
        if (this.outline=true){
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
        this.pcount=parseInt(pcount, 10);
        this.trail=trail;
        this._outline=false;
        this._outlinecolour='red';
        this.velocity=1.0; //velocity modifier
        this.opacity=32;
        this.blendmode=LIGHTEST;
        this.traillength=100;
        this.vx = new Array(this.pcount);
        this.vy = new Array(this.pcount);
        this.x = new Array(this.pcount);
        this.y = new Array(this.pcount);
        this.ax = new Array(this.pcount);
        this.ay = new Array(this.pcount);
        //this.elipsevars=new Array(this.pcount); //Stores the most recent set of variables for the elipse to draw
        this.his = new Array(this.pcount); //Stores a history of the point

        this.oscillatemax=1; //Defines the max number of pixels the size oscilates away from radius
        this.oscilationspeed=0; //Defines the speed at which the particles oscilate
        this.oscilationpoint=0; //Defines the point along the sine curve the oscilation is at

        this._magnetism = magnetism; //Strength of attractive force If it is negative, it becomes repulsive force.。
        this.radius = 1 ; //Radius of drawing circle
        this.deacceleration = 0.95; //Develerate particle movement
        this.traillength=5000;

        this.backgroundcycle=true; //This allows the trail-removing rectangle draw to only happen every other cycle.
        noStroke();
        fill(0);
        ellipseMode(RADIUS);
        background(0);
        blendMode(this.blendmode);

        for (let i = 0; i < this.pcount; i++) {
            this.x[i] = random(width);
            this.y[i] = random(height);
            this.vx[i] = 0;
            this.vy[i] = 0;
            this.ax[i] = 0;
            this.ay[i] = 0;
            this.his[i]=[];
            //this.elipsevars[i]={};

        }
    }



    addparticle(x=mouseX,y=mouseY) {
        this.x.push(x);
        this.y.push(y);
        this.vx.push(0);
        this.vy.push(0);
        this.ax.push(0);
        this.ay.push(0);
        this.his.push([]);
        //this.elipsevars.push({});
        this.pcount=this.pcount+1;
    }


    updatepcount(newcount) {

        while (this.x.length < newcount){ //Add points
            this.x.push(random(width));
            this.y.push(random(height));
            this.vx.push(0);
            this.vy.push(0);
            this.ax.push(0);
            this.ay.push(0);
            this.his.push([]);
            //this.elipsevars.push({});
        }

        while (this.x.length > newcount){ //Remove points starting with the most recently made
            this.x.pop();
            this.y.pop();
            this.vx.pop();
            this.vy.pop();
            this.ax.pop();
            this.ay.pop();
            this.his.pop();
            //this.elipsevars.pop();


        }

        this.pcount=newcount;
        if (this.pcount.toString() !== this.x.length.toString()){
            console.log('Pcount and values in X not equal -ERROR CODE: 0001'); //Breaks if stuff is wrong
            console.log('pcount: '+this.pcount.toString()+' | x length: '+this.x.length.toString());

        }
    }



    draw(ren) { //r is a renderer object that can be passed

        if (this.traillength<100 && this.backgroundcycle) { //This should only occur every other draw cycle, thus allowing greater opacity without removing all trails
            if (!ren) {
                let fillopacity = 40 - (map(this.traillength, 0, 100, 0, 40));//This uses the trail length given to calculate an opacity in which to draw a rectangle and obscure the length
                fill(0, fillopacity);
                blendMode(BLEND);
                rect(0, 0, width, height);
                blendMode(this.blendmode);

            }
            else{
                let fillopacity = 40 - (map(this.traillength, 0, 100, 0, 40));//This uses the trail length given to calculate an opacity in which to draw a rectangle and obscure the length
                ren.fill(0, fillopacity);
                ren.blendMode(BLEND);
                ren.rect(0, 0, width, height);
                ren.blendMode(this.blendmode);
            }
        }
        this.backgroundcycle=!this.backgroundcycle; //Swaps the value of the background cycle

        if (this.oscillatemax>0){ //Causes the point to oscilate between two sizes based on a sine curve
            this.cradius=this.radius+(sin(this.oscilationpoint)*this.oscillatemax);
            //console.log("OSCILATION AT "+this.cradius.toString()+ "| OSCILATION POINT: "+this.oscilationpoint.toString());
            if (this.oscilationpoint>=360-this.oscilationspeed){ //Prevents oscilationpoint from going above 360
                this.oscilationpoint=Math.abs(this.oscilationspeed); //TODO: Refine maths
                console.log('OSCILATION RESET');
            }
            else {
                this.oscilationpoint += Math.abs(this.oscilationspeed);
                //console.log("OSCILATION INCREMENTING BY "+Math.abs(this.oscilationspeed).toString())
            }
            if (this.cradius<0){
                this.cradius=0;
            }
        }
        else{
            this.cradius=this.radius;
        }
        if (!this.trail) {
            if (ren) {
                ren.clear();
                ren.background('black');
            }
            else {
                clear();
                background('black');
            }
        }


        for (let i = 0; i < this.pcount; i++) {
            this.distance = dist(mouseX, mouseY, this.x[i], this.y[i]); //dist(x1,y1,x2,y2) Function for finding the distance between two points
            //Acceleration is inversely proportional to the square of the distance from the center of gravity。
            if (this.distance > 3) { //If you are too close to the mouse, do not update the acceleration
                this.ax[i] =  this._magnetism * (mouseX - this.x[i]) / (Math.pow(this.distance, 2));
                this.ay[i] =  this._magnetism * (mouseY - this.y[i]) / (Math.pow(this.distance, 2));
            }
            this.vx[i] += this.ax[i]; // Increase the speed this.vx by this.ax per frame。
            this.vy[i] += this.ay[i]; // Increase the speed this.vy by this.ay only per frame.

            this.vx[i] = this.vx[i] * this.deacceleration ;
            this.vy[i] = this.vy[i] * this.deacceleration ;

            this.x[i] += this.vx[i]*this.velocity;  // Move forward this.vy pixels per frame.
            this.y[i] += this.vy[i]*this.velocity;  // Move forward this.vy pixels per frame.

            const velocity = dist(0, 0, this.vx[i], this.vy[i]); // Find velocity from X and Y components of velocity
            const r = map(velocity, 0, 5, 0, 255); //Calculate colors according to speed
            const g = map(velocity, 0, 5, 64, 255);
            const b = map(velocity, 0, 5, 128, 255);

            if (ren) {
                ren.fill(r, g, b, this.opacity);
                ren.ellipse(this.x[i], this.y[i], this.cradius, this.cradius);
            }
            else{
                fill(r, g, b, this.opacity);
                ellipse(this.x[i], this.y[i], this.cradius, this.cradius);
            }
        }




    }



}

//Todo: Random variation per particle
//Todo: Figure out why rect draws under the particles
