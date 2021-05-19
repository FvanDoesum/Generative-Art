/* 👇 Start writing your p5.js code here */
let video;  
let model;  
let face;   

let firstFace = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  rectMode(CENTER)

  
  video = createCapture(VIDEO);
  video.size(0);
  
  loadFaceModel();
  
}



async function loadFaceModel() {
  model = await blazeface.load();
}


function draw() {
  background(10,10,10);
  noFill()
  
  
  translate(width / 2, height / 2)
  
    if (video.loadedmetadata && model !== undefined) {
    getFace();
  }
  
  
  let rightEye;
  let leftEye;


  if (face !== undefined) {
    image(video, -500,-500, width,height);

    
    if (firstFace) {
      console.log(face);
      firstFace = false;
    }

    
    rightEye = face.landmarks[0];
    leftEye =  face.landmarks[1];
    let nose =     face.landmarks[2];
    let rightEar = face.landmarks[4];
    let leftEar =  face.landmarks[5];

    
    rightEye = scalePoint(rightEye);
    leftEye =  scalePoint(leftEye);
    nose =     scalePoint(nose);

    // Gekke oogjes
    fill (173,216,230)
    
    noStroke();
    circle(leftEye.x - 500,  leftEye.y - 500,  40);  
  
    
  
    for (var i = 0; i < 200; i++) {
      push()
      rotate(sin(frameCount + i) * 400)
      
    
      var r = random(sin(frameCount), -1, 1, 50, leftEye.x - 500)
      var g = map(cos(frameCount / 2), -1, 1, 50, leftEye.x - 500) 
      var b = map(cos(frameCount / 4), -1, 1, 50, leftEye.x - 500)
    
      stroke(r, g, b)
      rect(0, 0, 600 - i * 3, 600 - i * 3, 200 - i)
      pop()
    }
  }
}

function scalePoint(pt) {
  let x = map(pt[0], 0,video.width, 0,width);
  let y = map(pt[1], 0,video.height, 0,height);
  return createVector(x, y);
}


async function getFace() {
  
 
  const predictions = await model.estimateFaces(
    document.querySelector('video'),
    false
  );

  
  if (predictions.length === 0) {
    face = undefined;
  }

 
  else {
    face = predictions[0];
  }
}
