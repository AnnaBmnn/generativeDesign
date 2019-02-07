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


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// const clickButton = document.querySelector(".click");
// clickButton.addEventListener("click", ()=> {
//   checkOurPosition = true;
//   console.log("click");
// })

// let t;
// let long = 7.7521113;
// let lat = 48.5734053;
// let projectionSize = 1;
// let xPosition;
// let yPosition;

// console.log(lngToXWorld(long, projectionSize));

// const click = document.querySelector(".click");
// click.addEventListener('click', function(){
//   console.log("cilck");
//   id = navigator.geolocation.watchPosition(setPos, error);
//   navigator.geolocation.getCurrentPosition(setPos);

// })



let numberPointX ;
let numberPointY ;
let pointArray;
let gapX;
let gapY;
let startTime;
let bgColor;
let graphicForGrid;
let graphicForPositionMe;
// MAIRIE DE MONTREUIL
let longParty = 2.4412184;
let latParty = 48.8623357;
// IVRY SUR SEINE
// let longMe = 2.3872525;
// let latMe = 48.8122302;

// NEUILLY SUR SEINE
// let longMe = 2.2695658;
// let latMe = 48.884683;

// CORIX DE CHAVAUX
let longMe = 2.4357587;
let latMe = 48.857946;

// STRASBOURG
// let longMe = 7.7507127;
// let latMe = 48.584614;

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

function setup() {
  // init canvas and graphics
  if(windowWidth > windowHeight) {
    createCanvas(windowWidth*0.45, windowHeight*0.75);
  } else {
    createCanvas(windowWidth*0.75, windowHeight*0.75);
  }
  graphicForGrid = createGraphics(width, height);
  graphicForPositionMe = createGraphics(width, height);

  // init variable
  bgColor = 0;
  numberPointX = 25;
  numberPointY = 25;
  pointArray = [];

  minWindow = min(width, height);
  gapX = minWindow*0.90 / numberPointX -1;
  gapY = minWindow*0.90 / numberPointY - 1;
  projectionSize = 100;
  positionParty.xLong = lngToXWorld(longParty, projectionSize);
  positionParty.yLat = latToYWorld(latParty, projectionSize);
  positionMe.xLong = lngToXWorld(longMe, projectionSize);
  positionMe.yLat = latToYWorld(latMe, projectionSize);

  positionParty.x = getLongToXGrid(longParty);
  positionParty.y = getLatToYGrid(latParty);
  positionMe.x = getLongToXGrid(longMe);
  positionMe.y = getLatToYGrid(latMe);
  console.log({positionMe, positionParty});
  // init value for canvas
  background(bgColor);
  let translateX = (width - minWindow)*0.5 === 0 ? 20 : (width - minWindow)*0.5  ;
  let translateY = (height - minWindow)*0.5 === 0 ? 20 : (height - minWindow)*0.5;
  graphicForGrid.translate(translateX, translateY);
  stroke(0);
  fill(0, 0, 0);
  initArray();
  startTime = Date.now();
}

function draw() {
  background(bgColor, 5);
  let millis = (Date.now() - startTime)/1000000;
  // positionMe.x += 1;
  // positionMe.y += 0.001;
  // draw position soirée
  graphicForPositionMe.background(0, 10);
  graphicForPositionMe.stroke('rgba(255,20,147, 1)');
  graphicForPositionMe.fill('rgba(255,20,147, 1)');
  drawPosition(positionMe.x, positionMe.y, 40);
  image(graphicForPositionMe, 0,0);


  // forme
  noFill();
  stroke('rgba(100,100,255, 0.5)');
  beginShape();
  vertex(30, 20);
  bezierVertex(-10, -10, width, 75, 30, height*0.4);
  bezierVertex(30, 20, width, 75, 30, height);
  // bezierVertex(50, 80, 60, 25, 30, 20);
  endShape();
  beginShape();
  vertex(width, height);
  bezierVertex(width*0.5, height, 30, 40, width*0.2, height);
  // bezierVertex(30, 20, width, 75, 30, height);
  // bezierVertex(50, 80, 60, 25, 30, 20);
  endShape();
  beginShape();
  vertex(width, height*0.1);
  bezierVertex(width*0.3, height*0.2, height*0.5, width, width*0.2, height);
  // bezierVertex(30, 20, width, 75, 30, height);
  // bezierVertex(50, 80, 60, 25, 30, 20);
  endShape();
  fill(0);

  // draw grid
  graphicForGrid.clear();
  graphicForGrid.stroke('rgba(255,255,255, 1)');
  drawGrid(millis);
  image(graphicForGrid, 0,0);



  // draw position soiréee
  fill(0);
  stroke(255);
  let distMe = dist(positionParty.x, positionParty.y, positionMe.x, positionMe.y);
  ellipse(positionParty.x, positionParty.y, (Math.cos(noise(millis*20,millis*30)*-1.9*distMe))*10+40);


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
  x =  20 * noise(x * 0.01, y * millis)+x;
  y = 20 * noise(x * 0.01, y * millis)+y;
  graphicForPositionMe.ellipse(x, y, r, r);
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
      graphicForGrid.quad(x, y, xNextHorizontal, yNextHorizontal);
    }
    if(i%numberPointX == numberPointX-1){
    } else {
      graphicForGrid.line(x, y, xNext, yNext);
    }
  }
}
