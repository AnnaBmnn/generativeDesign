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
let maxDistance;
let middleY;
let middleX;

function getDistance(x1, y1, x2, y2){
  return Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
}



function initArray(){
  for(let i = 0 ; i < numberPointX; i++ ){
    for(let j = 0 ; j < numberPointY; j++ ){
      let positionX = i*gapX+gapX;
      let positionY = j*gapY+gapY;
      let radius = (maxDistance - getDistance(positionX, positionY, middleX, middleY))*0.05;

      pointArray.push([positionX,positionY, radius]);
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
  fill(255, 0, 0);
  // t = 0;
  // xPosition = lngToXWorld(long, projectionSize)
  // yPosition = latToYWorld(long, projectionSize)
  bgColor = 255;
  numberPointX = 60;
  numberPointY = 60;
  pointArray = [];
  gapX = width / numberPointX -1;
  gapY = height / numberPointY - 1;
  startTime = Date.now();
  middleY = (numberPointY*0.5)*gapX+gapX;
  middleX = (numberPointX*0.5)*gapY+gapY;
  maxDistance = getDistance(0, 0, middleX, middleY );
  initArray();
  blendMode(DIFFERENCE);
  fill('rgb(255,0,0)');
  drawPointille();
  translate(60, 60);
  fill('rgb(255,255,0)');
  drawPointille();
}

function drawPointille() {
  for(let i = 0; i <pointArray.length ; i ++){
    radius = pointArray[i][2];
    x = pointArray[i][0];
    y = pointArray[i][1];
    // x = 50 * noise(x * 0.01, pointArray[i][1] * millis)+pointArray[i][0];
    // y = 50 * noise(x * 0.01, pointArray[i][1] * millis)+pointArray[i][1];
    ellipse(x, y, radius, radius);
}
}

function draw() {
  // background(bgColor);
  // let millis = (Date.now() - startTime)/1000000;
  // millis = Math.abs(Math.cos(millis*800)*20)/1000;


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