var att;
var pCountVal;

var pCountSlider = document.getElementById("pCountSlider");
var pCountView = document.getElementById("pCountView");
pCountView.innerHTML=pCountSlider.value;

var velocitySlider = document.getElementById("velocitySlider");
var velocityView = document.getElementById("velocityView");
velocityView.innerHTML=(velocitySlider.value/100);

var sizeSlider = document.getElementById("sizeSlider");
var sizeView = document.getElementById("sizeView");
sizeView.innerHTML=(sizeSlider.value/100);

function setup() {

    pCountVal = parseInt(pCountSlider.value);
    createCanvas(1000, 500);
    att = new attractor(pCountVal,undefined,true);
    att.velocity=velocitySlider.value/100;
    att.radius=sizeSlider.value/100;
}

function draw() {
    att.draw()
}

function mousePressed(){
    att.addparticle()
}

pCountSlider.oninput = function() {
    att.updatepcount(parseInt(pCountSlider.value));
    pCountView.innerHTML=pCountSlider.value;
};

velocitySlider.oninput = function() {
    att.velocity=velocitySlider.value/100;
    velocityView.innerHTML=(velocitySlider.value/100);
};
sizeSlider.oninput = function() {
    att.radius=sizeSlider.value/100;
    sizeView.innerHTML=(sizeSlider.value/100);
};

function toggletrails(){
    att.trail=!att.trail;
}
