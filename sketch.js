import {lngToXWorld} from "./assets/js/mercator.js";
//Longitude de Strasbourg: 7.7521113

// Latitude de Strasbourg: 48.5734053


let t;
let long = 7.7521113;
let lat = 48.5734053;
let projectionSize = 1;

function setup() {
  createCanvas(400, 400);
  background(255);
  stroke(0, 15);
  noFill();
  t = 0;

}

function draw() {
  // commencer le tracer
  beginShape();
  for (let i = 0; i < width; i++) {
    // #TEST
    // angle entre 0 et 2PI
    // let ang = map(i, 0, 200, 0, TWO_PI);
    // #END TEST

    // // noise : une suite de valeur comme random mais en + harmonieux
    let y = 100 * noise(i * 0.01, t * 0.005)+t*0.3;

    // #TEST
    // let x = rad * cos(ang) ;
    // let y = rad * sin(ang) * pow(-1,t)*t*0.5;
     // #END TEST

    let x = i;

    // #TEST
    // let y = height * noise(x);
    // #END TEST
    
    curveVertex(x, y);
  }
  endShape();

  t += 1;

  // clear the background every 600 frames using mod (%) operator
  if (frameCount % 1000 == 0) {
	background(255);
  }

}