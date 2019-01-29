// import {lngToXWorld}  from "./assets/js/mercator.js";
//Longitude de Strasbourg: 7.7521113

// Latitude de Strasbourg: 48.5734053
lngToXWorld = function(lon, projectionSize) {
  var radius = projectionSize / (2 * Math.PI);
  var falseEasting = -1.0 * projectionSize / 2.0;
  return (radius * lon * Math.PI / 180) - falseEasting;
};

latToYWorld = function(lat, projectionSize) {
  var radius = projectionSize / (2 * Math.PI);
  var falseNorthing = projectionSize / 2;
  return ((radius / 2 * Math.log((1 + Math.sin(lat * Math.PI / 180)) / (1 - Math.sin(lat * Math.PI / 180)))) - falseNorthing) * -1;
};

// let t;
// let long = 7.7521113;
// let lat = 48.5734053;
// let projectionSize = 1;
// let xPosition;
// let yPosition;

// console.log(lngToXWorld(long, projectionSize));

let numberPointX ;
let numberPointY ;
let pointArray;
let gapX;
let gapY;
let startTime;
let bgColor;

function initArray(){
  for(let i = 0 ; i < numberPointX; i++ ){
    for(let j = 0 ; j < numberPointY; j++ ){
      let positionX = i*gapX+gapX;
      let positionY = j*gapY+gapY;
      pointArray.push([positionX,positionY]);
    }
  }
}

function setup() {
  createCanvas(400, 400);
  background(255);
  // stroke(0, 15);
  // noFill();
  // stroke(0);
  noStroke();
  fill(0, 0, 0, 105);
  // t = 0;
  // xPosition = lngToXWorld(long, projectionSize)
  // yPosition = latToYWorld(long, projectionSize)
  bgColor = 255;
  numberPointX = 10;
  numberPointY = 10;
  pointArray = [];
  gapX = width / numberPointX -1;
  gapY = height / numberPointY - 1;
  initArray();
  startTime = Date.now();
}

function draw() {
  background(bgColor);
  let millis = (Date.now() - startTime)/1000000;
  for(let i = 0; i <pointArray.length ; i ++){
      x = pointArray[i][0];
      x = 50 * noise(x * 0.01, pointArray[i][1] * millis)+pointArray[i][0];
      y = 50 * noise(x * 0.01, pointArray[i][1] * millis)+pointArray[i][1];
      rect(x, y, 70, 70);
  }

  // }
  // commencer le tracer
  // beginShape();
  // for (let i = 0; i < width; i++) {

    // let y = 100 * noise(i * 0.01, t * 0.005)+t*0.3;
    // let x = i;

    // #TEST
    // angle entre 0 et 2PI
    // let ang = map(i, 0, 200, 0, TWO_PI);

    // radius : noise : une suite de valeur comme random mais en + harmonieux
    // let rad = 200 * noise(i * 0.01, t * 0.005);

    // coordonnée en x/y , utilisation du cos et sin pour former un cercle
    // let x = rad * cos(ang);
    // let y = rad * sin(ang);
    // #END TEST

    // courbe avec pour vecteur directeur x et y
    // curveVertex(x, y);
  }
  // endShape();

  // t += 1;

  // clear the background every 600 frames using mod (%) operator
  // if (frameCount % 1000 == 0) {
	// background(255);
  // }

// }