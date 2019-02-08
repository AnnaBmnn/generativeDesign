// Calculate longitude and latitude, functio nfrom Mercator.js
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
const save = document.querySelector(".save");
const click = document.querySelector(".click");
click.addEventListener('click', function(){
  navigator.geolocation.getCurrentPosition((position)=>{
    isPosition = true;
    longMe = position.coords.longitude;
    latMe = position.coords.latitude;
    initPositions();
    clear();
    graphicForGrid.clear();
    background(bgColor);
    id = navigator.geolocation.watchPosition(setPos, error);
  });
})
save.addEventListener('click', function(){
  saveCanvas(`${day()}-${hour()}-${minute()}`,"jpg");

})

function setPos(position) {
  longMe = position.coords.longitude;
  latMe = position.coords.latitude;
}
function error(position) {
  console.log(position);
}

function windowResized() {
  let sizeCanvasCalculated = calculateSizeCanvas();
  resizeCanvas(sizeCanvasCalculated.widthCanvas, sizeCanvasCalculated.heightCanvas);
  initArray();
}

let isPosition = false;
let numberPointX ;
let numberPointY ;
let pointArray;
let gapX;
let gapY;
let startTime;
let bgColor;
let graphicForGrid;
let textVar;
let textLongPos;
let textLatPos;
// MAIRIE DE MONTREUIL
let longParty = 2.4412184;
let latParty = 48.8623357;
// IVRY SUR SEINE
// let longMe = 2.3872525;
// let latMe = 48.8122302;

// NEUILLY SUR SEINE
let longMe = 2.2695658;
let latMe = 48.884683;

// CORIX DE CHAVAUX
// let longMe = 2.4357587;
// let latMe = 48.857946;

// STRASBOURG
// let longMe = 7.7507127;
// let latMe = 48.584614;

// POSITION
// latMe = geoplugin_latitude();
// longMe = geoplugin_longitude();


let projectionSize;
let minWindow;
let positionParty = {
  x: 0,
  y: 0,
  xLong: 0,
  yLat: 0
  
}
let positionMe = {
  x: 0,
  y: 0,
  xLong: 0,
  yLat: 0
}

function preload() {
  druk = loadFont('./assets/fonts/Druk-Wide-Super.otf');
}

function calculateSizeCanvas(){
  let widthCanvas, heightCanvas;
  if(width > 1000) {
    if(windowWidth > windowHeight) {
      widthCanvas = windowWidth*0.45;
      heightCanvas = windowWidth*0.45;
      return {widthCanvas, heightCanvas}
    } else {
      widthCanvas = windowWidth*0.45;
      heightCanvas = windowWidth*0.45;
      return {widthCanvas, heightCanvas}
    }
  } else {
    if(windowWidth > windowHeight) {
      widthCanvas = windowHeight*0.75;
      heightCanvas = windowHeight*0.75;
      return {widthCanvas, heightCanvas}
    } else {
      widthCanvas = windowWidth*0.75;
      heightCanvas = windowWidth*0.75;
      return {widthCanvas, heightCanvas}
    }
  }
}

function setup() {
  // init canvas and graphics
  let sizeCanvasCalculated = calculateSizeCanvas();
  createCanvas(sizeCanvasCalculated.widthCanvas, sizeCanvasCalculated.heightCanvas);

  graphicForGrid = createGraphics(width, height);

  // init variable
  bgColor = 0;
  numberPointX = 25;
  numberPointY = 25;
  pointArray = [];

  minWindow = min(width, height);
  gapX = minWindow*0.90 / numberPointX -1;
  gapY = minWindow*0.90 / numberPointY - 1;
  projectionSize = 100;

  initPositions();
  // init value for canvas
  background(bgColor);
  let translateX = (width - minWindow)*0.5 === 0 ? 20 : (width - minWindow)*0.5  ;
  let translateY = (height - minWindow)*0.5 === 0 ? 20 : (height - minWindow)*0.5;
  translate(translateX, translateY);
  stroke(0);
  fill(0, 0, 0);
  initArray();
  startTime = Date.now();
  textVar = `SOIRÉE ÉPHÉMÈRE `;

}

function draw() {
  // background(bgColor, 5);
  textAlign(LEFT);

  textFont(druk);
  // text 
  push();
  fill(255);
  noStroke();
  rotate(PI/2);
  translate(height*0.05, -10);
  textSize(26);
  text(textVar, 0, 0);
  pop();

  // longMe += 0.001;
  let millis = (Date.now() - startTime)/1000000;
  let distMe = dist(positionParty.x, positionParty.y, positionMe.x, positionMe.y);

  // #TODO IF POSITION ELSE MOVE
  if(isPosition){
    positionMe.xLong = lngToXWorld(longMe, projectionSize);
    positionMe.yLat = latToYWorld(latMe, projectionSize);

    positionMe.x = getLongToXGrid(longMe);
    positionMe.y = getLatToYGrid(latMe);
  } else {
    positionMe.x = cos(millis*30)*200 + width*0.5;
    positionMe.y = sin(millis*30)*200 + height*0.5;
  }


  // draw position soirée
  background(bgColor, 5);
  stroke('rgba(255,20,147, 0.5)');
  fill('rgba(255,20,147, 0.5)');
  drawPosition(positionMe.x, positionMe.y, 40);
  
  // drawPosition(positionMe.x, positionMe.y, 200-distMe);
  image(graphicForGrid, 0,0);

  fill(0);
  // draw grid
  push();
  translate(width*0.1, 10);
  stroke('rgba(216,70,255, 0.4)');
  drawGrid(millis);
  image(graphicForGrid, 0,0);
  stroke('rgba(0,255,255,0.4)');
  translate(2,2);
  drawGrid(millis);
  image(graphicForGrid, 0,0);
  pop();

  // draw position soiréee
  fill(0);
  stroke(255);
  ellipse(positionParty.x, positionParty.y, 70+2*cos(10000/distMe));

  // text
  textLongPos = `long: ${longMe}`;
  textLatPos = `lat: ${latMe}`;
  textAlign(RIGHT);
  push();
  stroke(255);
  noFill();
  textSize(16);
  translate(width-10, 0);
  text(textLongPos, 10 , height-height*0.1);
  text(textLatPos, 10 , height-height*0.1-26);
  pop();
}

function initPositions(){
  positionParty.xLong = lngToXWorld(longParty, projectionSize);
  positionParty.yLat = latToYWorld(latParty, projectionSize);
  positionMe.xLong = lngToXWorld(longMe, projectionSize);
  positionMe.yLat = latToYWorld(latMe, projectionSize);

  positionParty.x = getLongToXGrid(longParty);
  positionParty.y = getLatToYGrid(latParty);
  positionMe.x = getLongToXGrid(longMe);
  positionMe.y = getLatToYGrid(latMe);
}


function initArray(){
  for(let i = 0 ; i < numberPointX; i++ ){
    for(let j = 0 ; j < numberPointY; j++ ){
      let positionX = i*gapX+gapX;
      let positionY = j*gapY+gapY;
      pointArray.push([positionX,positionY]);
    }
  }
}

// Calculate postion
function getPointXGrid(x, y, millis){
  x = x*0.01;
  y = y*millis +x;
  return 20 * noise( x, y)+x*100;
}

function getPointYGrid(x, y, millis){
  return 20 * noise(x * 0.01, y * millis)+y;
}

function getLongToXGrid(long){
  let xMe = positionMe.xLong;
  let xParty = positionParty.xLong;
  let x = lngToXWorld(long, projectionSize);
  let minX = min(xMe, xParty);
  let maxX = max(xMe, xParty);
  minX = Math.floor((minX-0.1)*10)/10;
  maxX = Math.ceil((maxX+0.1)*10)/10;

  x = map(x, minX, maxX, 0, width);

  return x;
}

function getLatToYGrid(lat){
  let yMe = positionMe.yLat;
  let yParty = positionParty.yLat;
  let y = latToYWorld(lat, projectionSize);
  let minY = min(yMe, yParty);
  let maxY = max(yMe, yParty);
  minY = Math.floor((minY-0.001)*100)/100;
  maxY = Math.ceil((maxY+0.001)*100)/100;
  y = map(y, minY, maxY, 0, height);

  return y;
}

function drawPosition(x, y, r ){
  ellipse(x, y, r, r);
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
      quad(x, y, xNextHorizontal, yNextHorizontal);
    }
    if(i%numberPointX == numberPointX-1){
    } else {
      line(x, y, xNext, yNext);
    }
  }
}

function keyTyped(){
  if(key === "s"){
      saveCanvas(`${day()}-${hour()}-${minute()}`,"jpg");
  }
}