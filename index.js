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

var oscspeedSlider = document.getElementById("oscspeedSlider");
var oscspeedView = document.getElementById("oscspeedView");
oscspeedView.innerHTML=(oscspeedSlider.value/1000);

var oscvalSlider = document.getElementById("oscvalSlider");
var oscvalView = document.getElementById("oscvalView");
oscvalView.innerHTML=(oscvalSlider.value/100);

function setup() {

    pCountVal = parseInt(pCountSlider.value);
    createCanvas(1000, 500);
    att = new attractor(pCountVal,undefined,true);
    att.velocity=velocitySlider.value/100;
    att.radius=sizeSlider.value/100;
    //att.outline=true;
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

oscspeedSlider.oninput = function() {
    att.oscilationspeed=oscspeedSlider.value/1000;
    oscspeedView.innerHTML=(oscspeedSlider.value/1000);
};

oscvalSlider.oninput = function() {
    att.oscillatemax=oscvalSlider.value/100;
    oscvalView.innerHTML=(oscvalSlider.value/100);
};


function toggleTrails(){
    att.trail=!att.trail;
}

function resetValues(){
    //pcount
    pCountSlider.value=1000;
    att.updatepcount(parseInt(pCountSlider.value));
    pCountView.innerHTML=pCountSlider.value;

    //velocity
    velocitySlider.value=100;
    att.velocity=velocitySlider.value/100;
    velocityView.innerHTML=(velocitySlider.value/100);

    //size
    sizeSlider.value=100;
    att.radius=sizeSlider.value/100;
    sizeView.innerHTML=(sizeSlider.value/100);

    //oscspeed
    oscspeedSlider.value=0;
    att.oscilationspeed=oscspeedSlider.value/1000;
    oscspeedView.innerHTML=(oscspeedSlider.value/1000);

    //oscval
    oscvalSlider.value=1;
    att.oscillatemax=oscvalSlider.value/100;
    oscvalView.innerHTML=(oscvalSlider.value/100);

    //trails
    att.trail=true;


}
