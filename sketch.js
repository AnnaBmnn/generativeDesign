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
  background(0);
  // stroke(0, 15);
  // noFill();
  stroke(0);
  // noStroke();
  fill(0, 0, 0);
  // t = 0;
  // xPosition = lngToXWorld(long, projectionSize)
  // yPosition = latToYWorld(long, projectionSize)
  bgColor = 0;
  numberPointX = 30;
  numberPointY = 30;
  pointArray = [];
  gapX = width / numberPointX -1;
  gapY = height / numberPointY - 1;
  initArray();
  startTime = Date.now();
}

function drawPosition(x, y, r ){
  x = x*gapX+gapX;
  y = y*gapY+gapY;
  x =  20 * noise(x * 0.01, y * millis)+x;
  y = 20 * noise(x * 0.01, y * millis)+y;
  ellipse(x, y, r, r);
}

function draw() {
  // background(bgColor);
  background(0, 5);
  let millis = (Date.now() - startTime)/1000000;
  stroke('rgba(65,211,220, 0.5)');
  drawGrid(millis);
  drawPosition(10, 12, 30);
  translate(1, 1);
  // stroke('rgba(0,255,0, 0.5)');
  // drawGrid(millis);
  // drawPosition(18, 18, 40);
  stroke('rgba(134,65,220, 0.5)');
  translate(1, 1);
  drawGrid(millis);
  fill(255);
  // drawPosition(20, 18, 80);
  // blendMode(NORMAL);
  // fill(0);


}

function drawGrid(millis){
  for(let i = 0; i <pointArray.length-1 ; i ++){
    x = pointArray[i][0];
    y = pointArray[i][1]
    xNext = pointArray[i+1][0];
    yNext = pointArray[i+1][1];
    x = 20 * noise(x * 0.01, y * millis)+x;
    xNext = 20 * noise(xNext * 0.01, yNext * millis)+xNext;
    y = 20 * noise(x * 0.01, y * millis)+y;
    yNext = 20 * noise(xNext * 0.01, yNext * millis)+yNext;
    if(pointArray[i+numberPointX]){
      yNextHorizontal = pointArray[i+numberPointX][1];
      xNextHorizontal = pointArray[i+numberPointX][0];
      xNextHorizontal = 20 * noise(xNextHorizontal * 0.01, yNextHorizontal * millis)+xNextHorizontal;
      yNextHorizontal = 20 * noise(xNextHorizontal * 0.01, yNextHorizontal * millis)+yNextHorizontal;
      line(x, y, xNextHorizontal, yNextHorizontal);
    }
    // ellipse(x,y, 3, 3);
    if(i%numberPointX == numberPointX-1){
    } else {
      line(x, y, xNext, yNext);
    }
  }
}
