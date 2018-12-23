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

var opacSlider = document.getElementById("opacSlider");
var opacView = document.getElementById("opacView");
opacView.innerHTML=(opacSlider.value);

function setup() {

    pCountVal = parseInt(pCountSlider.value);
    createCanvas(1000, 500);
    att = new attractor(pCountVal,undefined,true);
    att.velocity=velocitySlider.value/100;
    att.radius=sizeSlider.value/100;
    att.oscilationspeed=oscspeedSlider.value/1000;
    att.oscillatemax=oscvalSlider.value/100;
    att.opacity=parseInt(opacSlider.value);
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
    att.oscillatemax=Number(oscvalSlider.value/100);
    oscvalView.innerHTML=(oscvalSlider.value/100);
};

opacSlider.oninput = function() {
    att.opacity=parseInt(opacSlider.value);
    opacView.innerHTML=opacSlider.value;
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

    opacSlider.value=32;
    att.opacity=parseInt(opacSlider.value);
    opacView.innerHTML=opacSlider.value;

    //trails
    att.trail=true;


}
