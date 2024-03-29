
let pCountVal = 1000;

const pCountSlider = document.getElementById('pCountSlider'),
    pCountView = document.getElementById('pCountView');

pCountView.innerHTML = pCountSlider.value;

const velocitySlider = document.getElementById('velocitySlider'),
    velocityView = document.getElementById('velocityView');

velocityView.innerHTML = velocitySlider.value / 100;

const sizeSlider = document.getElementById('sizeSlider'),
    sizeView = document.getElementById('sizeView');

sizeView.innerHTML = sizeSlider.value / 100;

const oscspeedSlider = document.getElementById('oscspeedSlider'),
    oscspeedView = document.getElementById('oscspeedView');

oscspeedView.innerHTML = oscspeedSlider.value / 1000;

const oscvalSlider = document.getElementById('oscvalSlider'),
    oscvalView = document.getElementById('oscvalView');

oscvalView.innerHTML = oscvalSlider.value / 100;

const opacSlider = document.getElementById('opacSlider'),
    opacView = document.getElementById('opacView');

opacView.innerHTML = opacSlider.value;

const trailSlider = document.getElementById('trailSlider'),
    trailView = document.getElementById('trailView');

opacView.innerHTML = opacSlider.value/10;

const colourPicker = document.getElementById('colourPicker');

let att;
let ren;


function setup () {


    pCountVal = parseInt(pCountSlider.value, 10);

    createCanvas(1400, 550);
    ren=createGraphics(1400,550);

    att = new Attractor(pCountVal, undefined, true);

    att.velocity = velocitySlider.value / 100;
    att.radius = sizeSlider.value / 100;
    att.oscillationspeed = oscspeedSlider.value / 1000;
    att.oscillatemax = oscvalSlider.value / 100;
    att.opacity = parseInt(opacSlider.value);
    att.traillength=parseFloat(trailSlider.value/10);
    att.basecolour = colourPicker.value.toString();
    // Att.outline = true;

}

function draw () {

    att.draw();
    image(ren,0,0);

}

function mousePressed () {

    att.addparticle();

}

pCountSlider.oninput = function oninput () {

    att.pcount = (parseInt(pCountSlider.value));
    pCountView.innerHTML = pCountSlider.value;

};

velocitySlider.oninput = function oninput () {

    att.velocity = velocitySlider.value / 100;
    velocityView.innerHTML = velocitySlider.value / 100;

};
sizeSlider.oninput = function oninput () {

    att.radius = sizeSlider.value / 100;
    sizeView.innerHTML = sizeSlider.value / 100;

};

oscspeedSlider.oninput = function oninput () {

    att.oscillationspeed = oscspeedSlider.value / 1000;
    oscspeedView.innerHTML = oscspeedSlider.value / 1000;

};

oscvalSlider.oninput = function oninput () {

    att.oscillatemax = Number(oscvalSlider.value / 100);
    oscvalView.innerHTML = oscvalSlider.value / 100;

};

opacSlider.oninput = function oninput () {

    att.opacity = parseInt(opacSlider.value);
    opacView.innerHTML = opacSlider.value;

};

trailSlider.oninput = function oninput () {

    att.traillength = parseFloat(trailSlider.value/10);
    trailView.innerHTML = trailSlider.value/10;

};


function toggleTrails  () { //Called in HTML

    att.trail = !att.trail;

}

function colourChange() { //Called in HTML
    att.basecolour = colourPicker.value.toString();
    //console.log(colourPicker.value.toString());
}

function resetValues () { //Called in HTML

    // Pcount
    pCountSlider.value = 1000;
    att.pcount = parseInt(pCountSlider.value);
    pCountView.innerHTML = pCountSlider.value;

    // Velocity
    velocitySlider.value = 100;
    att.velocity = velocitySlider.value / 100;
    velocityView.innerHTML = velocitySlider.value / 100;

    // Size
    sizeSlider.value = 100;
    att.radius = sizeSlider.value / 100;
    sizeView.innerHTML = sizeSlider.value / 100;

    // Oscillation Speed
    oscspeedSlider.value = 0;
    att.oscilationspeed = oscspeedSlider.value / 1000;
    oscspeedView.innerHTML = oscspeedSlider.value / 1000;

    // Oscval
    oscvalSlider.value = 1;
    att.oscillatemax = oscvalSlider.value / 100;
    oscvalView.innerHTML = oscvalSlider.value / 100;

    //Opacity
    opacSlider.value = 32;
    att.opacity = parseInt(opacSlider.value, 10);
    opacView.innerHTML = opacSlider.value;

    // Trails
    att.trail = true;

    // Trail Length
    trailSlider.value = 1000;
    att.traillength = parseFloat(trailSlider.value/10);
    trailView.innerHTML = trailSlider.value/10;

    // Base Colour
    colourPicker.value = '#004080';
    att.basecolour = colourPicker.value.toString();




}
