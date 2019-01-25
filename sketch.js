var t;

function setup() {
  createCanvas(400, 400);
  background(255);
  stroke(0, 15);
  noFill();
  t = 0;
}

function draw() {
  translate(width/2, height/2);
  // commencer le tracer
  beginShape();
  for (var i = 0; i < 200; i++) {
    // angle entre 0 et 2PI
    var ang = map(i, 0, 200, 0, TWO_PI);
    // noise : une suite de valeur comme random mais en + harmonieux
    var rad = 100 * noise(i * 0.01, t * 0.005);

    var x = rad * cos(ang) * pow(-1,t);
    var y = rad * sin(ang) * pow(-1,t)*t*0.5;
    curveVertex(x, y);
  }
  endShape();

  t += 1;

  // clear the background every 600 frames using mod (%) operator
  if (frameCount % 600 == 0) {
	background(255);
  }

}