//vizualization of my "art" functions
//ported to P5JS from a sketch by Pierre MARZIN 12/10/2014
var nbpix, cote, pcote;
var w, h;
var sym=false;
var blackandwhite=false;
var cycles;
var epsilon;
var pimg;
var drawn = false;
var f0, f1, f2, f3, m, mt1, mt2, mt3, m1, m2, m3, t0, t1, t2, t3, flou, col;
var hu, sat, bri, alp;
var bg = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    w = width;
    h = height;
    colorMode(HSB, 360, 255, 255, 255);
    cycles = [];
    drawn = false;
    nbpix = w * h;
    smooth(8);
    cote = 150;
    pcote = 1;
    pimg = createGraphics(w, h);
    pimg.noStroke();
    pimg.fill(255);
    pimg.rect(0,0,w,h);
    pimg.noFill();
    pimg.stroke(0);
    pimg.strokeWeight(pcote);
    pimg.ellipse(width / 2, height / 2, cote, cote);
    pimg.strokeWeight(.1);
    pimg.loadPixels();
    m = 1;
    initiate();
}

function initiate() {
    f0 = random(-.000005, .000005); //
    mt1 = random(-2, 2);
    mt2 = random(-2, 2);
    mt3 = random(-2, 2);
    m1 = random(1) > .5 ? random(.1, 2) : -random(.1, 2);
    m2 = random(1) > .5 ? random(.1, 2) : -random(.1, 2);
    m3 = random(1) > .5 ? random(.1, 2) : -random(.1, 2);
    f1 = random(-5, 5);
    f2 = random(-5, 5);
    f3 = random(-5, 5);
    flou = .7;
    t0 = random(.01);
    epsilon = random(.001, .01);
    hu = random(360);
    sat =blackandwhite?0: random(255);
    bri=255-bg*.8;
    alp = 15;
    textSize(14);
    cycles.push(new Cycle(0));
    cycles.push(new Cycle(1));
}

function draw() {
    t0 += f0;
    t1 = t0 * f1 + mt1;
    t2 = t0 * f2 + mt2;
    t3 = t0 * f3 + mt3;
    cycles[0].update();
}

function keyReleased() {
    if (key == ' ') setup();
    else if (key == 'b' || key == 'B') {
        bg = 255 - bg;
        cycles=[];
        initiate();
    } else if (key == 's' || key == 'S') {
        save("svimg" + day() + "_" + month() + "_" + hour() + "_" + minute() + "_" + second() + ".jpg");
    }
    else if (key == 'r' || key == 'R') {
        cycles=[];
        initiate();
    }
    else if (key == 'y' || key == 'Y') {
        sym=!sym;
    }
    else if (key == 'k' || key == 'K') {
        blackandwhite=!blackandwhite;
        sat =blackandwhite?0: random(255);
    }
}

function mousePressed() {
    if (!drawn) {
        pimg.fill(255);
        pimg.rect(0,0,w,h);
    }
    drawn = true;
}

function mouseDragged() {
    var d = dist(mouseX, mouseY, pmouseX, pmouseY);
    for (var i = 0; i < d; i++) {
        pimg.point(pmouseX + int(i * (mouseX - pmouseX) / d), pmouseY + int(i * (mouseY - pmouseY) / d));
    }
    image(pimg, 0, 0);
}

function mouseWheel(event) {
    flou += .001 * event.delta;
}

function mouseReleased() {
    for (var i = 0; i < cycles.length; i++) {
        cycles[i].initiate();
    }
    if(cycles[0].points.length<3)setup();
}

function getImgPixelBrightness(x, y, img) {
    var pos = 4 * (floor(x) + floor(y) * img.width);
    bri = img.pixels[pos];
    return bri;
}

function Cycle(index) {
    this.index = index;
    this.e = epsilon * random(.8, 1.2);
    this.points = [];
    this.initiate();
}
Cycle.prototype.update = function() {
    for (var i = 0; i < this.points.length; i++) {
        var v = this.points[i];
        stroke(color((hu + 20 * int(i / 100)) % 360, sat,bri, alp));
        point(v.x, v.y);
        if(sym) point(width - v.x, v.y);
        v.sub(createVector(m * flou*f(this.e * v.x, this.e * v.y), m *flou* g(this.e * v.x, this.e * v.y)));
    }
}
Cycle.prototype.initiate = function() {
    fill(bg);
    rect(0,0,w,h);
    pimg.loadPixels();
    this.points = [];
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            if (pimg.pixels[4 * (i + j * width)] < 200) {
                this.points.push(createVector(i, j));
            }
        }
    }
    console.log(this.points.length);
}

function f(x, y) {
    var a = exp(1 - cos(y)) + t0 + y; //PI*cos(y);//t0+PI*(y);//exp(1/y);
    return (m1 * cos(t0 + x + m2 * cos(t1 * PI * y)) + m3 * cos(t2 * pow((a), 3)) + m1 * cos(a)); //10*t0));//);//+m1*(pow(sin(a),3)+pow(cos(a),3)));////noise(y*.001,x*.001)*
}

function g(x, y) {
    var a = exp(1 - cos(x)) + t2 + x; //PI*cos(x);//
    return (m1 * cos(t0 + y + m2 * cos(t1 * PI * x)) + m3 * cos(t3 * pow((a), 3)) + m1 * cos(a)); //10*t0));//);//+m3*(pow(cos(a),3)+pow(sin(a),3)));////noise(x*0.001,y*0.001)*
}