var att;
var pCountVal;
var pCountSlider = document.getElementById("pCountRange");

function setup() {

    pCountVal = pCountSlider.value;
    createCanvas(1000, 500);
    att = new attractor(pCountVal);

}

function draw() {
    att.draw()
}

pCountSlider.oninput = function() {
    setup()
}
