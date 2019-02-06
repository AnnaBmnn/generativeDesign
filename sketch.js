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
let pg;
let pgPosition;


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
  createCanvas(600, 600);
  pg = createGraphics(600, 600);
  pgPosition = createGraphics(600, 600);
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
  numberPointX = 25;
  numberPointY = 25;
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
  pgPosition.ellipse(x, y, r, r);

}

function draw() {
  // background(bgColor);
  background(bgColor, 5);
  // pgPosition.background(bgColor, 5);
  let millis = (Date.now() - startTime)/1000000;
  // pg.background(0);
  pg.clear();
  pgPosition.background(0, 10);
  pg.stroke('rgba(255,255,255, 0.5)');
  pgPosition.stroke('rgba(255,255,255, 0.5)');
  translate(2, 2);
  drawGrid(millis);
  image(pgPosition, 0,0);
  image(pg, 0,0);

  fill(0);
  drawPosition(18-millis*500, 18-millis*200, 40);
  drawPosition(millis*500, millis*200, 40);
}

function getPointXGrid(x, y, millis){
  x = x*0.01;
  y = y*millis +x;
  return 20 * noise( x, y)+x*100;
  xLoc = random(0, 10);
  yLoc = random(10, 100);
}
function getPointYGrid(x, y, millis){
  xLoc = random(0, 10);
  yLoc = random(10, 100);
  return 20 * noise(x * 0.01, y * millis)+y;
}

function drawGrid(millis){
  for(let i = 0; i <pointArray.length-1 ; i ++){
    x = pointArray[i][0];
    y = pointArray[i][1]
    xNext = pointArray[i+1][0];
    yNext = pointArray[i+1][1];
    x = getPointXGrid(x, y, millis);
    y = getPointYGrid(x, y, millis);
    xNext = getPointXGrid(xNext, yNext, millis);
    yNext = getPointYGrid(xNext, yNext, millis);
    if(pointArray[i+numberPointX]){
      yNextHorizontal = pointArray[i+numberPointX][1];
      xNextHorizontal = pointArray[i+numberPointX][0];
      xNextHorizontal = getPointXGrid(xNextHorizontal, yNextHorizontal,millis);
      yNextHorizontal = getPointYGrid(xNextHorizontal, yNextHorizontal,millis);
      pg.line(x, y, xNextHorizontal, yNextHorizontal);
    }
    // ellipse(x,y, 3, 3);
    if(i%numberPointX == numberPointX-1){
    } else {
      pg.line(x, y, xNext, yNext);
    }
  }
}
