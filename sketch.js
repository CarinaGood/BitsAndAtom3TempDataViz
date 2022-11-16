console.log('Loading data...');

let table;

let xPosDistance;

function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  xPosDistance = windowWidth / 12;
  background(10);
  translate(windowWidth / 16, windowHeight / 16, 100);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  drawHorizontalLines();

  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    const meanTemp = table.get(i, 'Annual_Mean_Temperature');
    const futureMeanTemp = table.get(i, 'future_Annual_Mean_Temperature');

    const yPosition = convertDegreesToPosition(meanTemp);
    const futureYPosition = convertDegreesToPosition(futureMeanTemp);

    drawVerticalLines(i);
    drawTemperature(i,futureYPosition, yPosition);
    drawLabelToday(city, i, meanTemp, futureMeanTemp);
  }
}

function convertDegreesToPosition(temp) {
  const position = map(temp, 6, 20, windowHeight/24*21, windowHeight/24);
  return position;
}

function drawTemperature(i,futureY, y) {
  noStroke();
  rect(i*xPosDistance, futureY, 20, y-futureY, 4);
}

function drawLabelToday(txt, xPos, meanTemp, futureMeanTemp) {
  fill(210);
  // future temp label
  text(`${parseInt(futureMeanTemp)}°`, xPos*xPosDistance+(xPosDistance/4), convertDegreesToPosition(futureMeanTemp));
  // city label
  text(txt, xPos*xPosDistance-10 , -16);
  // temp label
  text(`${parseInt(meanTemp)}°`, xPos*xPosDistance+(xPosDistance/4), convertDegreesToPosition(meanTemp));
}

function drawVerticalLines(i){
  stroke(10); // is needed
  linearGradient(
    width/2, height/2-200, //Start point
    width/2, height/2+200, //End point
    color(0, 70, 70, 100), //Start color
    color(56, 70, 70, 100), //Middle color
    color(236, 70, 70, 100), //End color
  );
  line(i*xPosDistance+10, 0, i*xPosDistance+10, height - height/8);
}

function drawHorizontalLines(){
  for (let i = 6; i < 21; i++) {
    stroke(10);
    line(-xPosDistance/4 ,convertDegreesToPosition(i), width - width/8, convertDegreesToPosition(i));
    fill(210);
    text(`${i}°`, -xPosDistance/2 ,convertDegreesToPosition(i));
  }
}

function linearGradient(sX, sY, eX, eY, colorS, colorM, colorE){
  let gradient = drawingContext.createLinearGradient(
    sX, sY, eX, eY
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(0.5, colorM);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
  drawingContext.strokeStyle = gradient;
}
