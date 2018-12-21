var att;
var pCountVal;
var pCountSlider = document.getElementById("pCountSlider");
var pCountView = document.getElementById("pCountView");
pCountView.innerHTML=pCountSlider.value;

function setup() {

    pCountVal = pCountSlider.value;
    createCanvas(1000, 500);
    att = new attractor(pCountVal,undefined,true);

}

function draw() {
    att.draw()
}

pCountSlider.oninput = function() {
    att.updatepcount(pCountSlider.value);
    pCountView.innerHTML=pCountSlider.value;
};

function toggletrails(){
    att.trail=!att.trail;
}
