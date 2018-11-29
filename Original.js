ArrayList<Attractor> attractors;
ArrayList<Agent> agents;

boolean doClear = false;
boolean play = true;
boolean mirror = true;
boolean rotate = false;

void setup(){
    size(800, 800);
    background(0);
    colorMode(HSB,360,100,100,100);
    noStroke();
    frameRate(60);

    attractors = new ArrayList<Attractor>();
    agents = new ArrayList<Agent>();

    for(int i = 0; i < 0; i++){
        Attractor a = new Attractor();
        attractors.add(a);
    }

    for(int i = 0; i < 1500; i++){
        Agent a = new Agent();
        agents.add(a);
    }
}

void draw(){

    if(doClear){
        background(0);

        agents.clear();
        attractors.clear();

        for(int i = 0; i < 2000; i++){
            Agent a = new Agent();
            agents.add(a);
        }

        doClear = false;
    }

    if(play){
        fill(0,0,0,10);
        noStroke();
        rect(0,0,width,height);
        for(int i = 0; i < agents.size(); i++){
            agents.get(i).update();
        }
    }

    for(int i = 0; i < attractors.size(); i++){
        attractors.get(i).update();
    }
}

void mouseClicked(){
    Attractor a = new Attractor(mouseX,mouseY);
    attractors.add(a);

    if(mirror){
        Attractor a = new Attractor(width-mouseX,height-mouseY);
        attractors.add(a);
    }
}

void keyPressed() {
    if (key == 32) {
        //doClear = true;
    }

    if(key == 'Q' || key == 'q'){
        for(int i = 0; i < agents.size(); i++){
            agents.get(i).reset();
        }
    }

    if(key == 'M' || key == 'm'){
        mirror = !mirror;
    }

    if (key == 10) {
        play = !play;
    }
}

class Agent {
    public PVector oPos;
    public PVector nPos;
    public PVector vel;
    public float mass;
    public color c;

    Agent(){
        oPos = new PVector(0,0);
        nPos = new PVector(0,0);
        vel = new PVector(0,0);
        c = color(0,100,100); //color(random(360), 50, 70);
        mass = 1;
        reset();
    }

    void update(){
        boolean doReset = false;

        for(int i = 0; i < attractors.size(); i++){
            Attractor a = attractors.get(i);

            if(PVector.dist(nPos, a.pos) < 10){
                doReset = true;
            }

            float d2 = pow(PVector.dist(nPos, a.pos),2);

            PVector n = PVector.sub(a.pos,nPos);
            n.normalize();
            float f = 100 * (a.mass*mass) / d2;

            n.mult(f);
            vel.add(n);
        }

        nPos.add(vel);

        if(doReset == true) {
            reset();
        }
        if(nPos.x < 0){
            reset();
        }
        if(nPos.y < 0){
            reset();
        }
        if(nPos.x > width){
            reset();
        }
        if(nPos.y > height){
            reset();
        }

        c = color(vel.mag()*50,90,vel.mag()*15+30);
        stroke(c);
        strokeWeight(3);
        line(oPos.x, oPos.y, nPos.x, nPos.y);
        oPos = new PVector(nPos.x,nPos.y);
    }

    public void reset(){
        vel = new PVector(0,0);

        int dir = int(random(4));

        if(dir == 0){
            nPos = new PVector(random(width),0);
        }
        if(dir == 1){
            nPos = new PVector(random(width),height);
        }
        if(dir == 2){
            nPos = new PVector(0,random(height));
        }
        if(dir == 3){
            nPos = new PVector(width,random(height));
        }

        oPos = new PVector(nPos.x,nPos.y);
    }
}

class Attractor {
    public PVector pos;
    public float mass;

    Attractor(float x, float y){
    pos = new PVector(x, y);
    mass = 1;
}

void update(){
    fill(0,0,100);
    noStroke();
    ellipse(pos.x, pos.y , 5, 5);
}
}