var mySong;
var myBack;
var img = [];
var img1;
var button;



function preload() {
  // put preload code here
  mySong = loadSound('./assets/fri.mp3');
  myBack = loadImage('./assets/back.jpg');
  img1 = loadImage('./assets/fri1.jpg');
  for (var i = 0; i < 5; i++) {
    img[i] = loadImage('./assets/fri' + i + '.jpg');
  }


}


function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  angleMode(CENTER);
  background(myBack, 0, 0, image.width, image.height);

  fft = new p5.FFT(0, 256);
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

  //texts
  fill('white');
  text('Click to start and stop the music', width / 2.30, height - 30);
  textAlign(CENTER);
  textSize(20);
  //mySong.play();

}

function draw() {
  // put drawing code here


  //palline

  fill(color(random(255), random(255), random(255)));
  noStroke();
  ellipse(width / 3.60, height / 2.25, width / 80)

  fill(color(random(255), random(255), random(255)));
  noStroke();
  ellipse(width / 2.64, height / 2.25, width / 80)

  fill(color(random(255), random(255), random(255)));
  noStroke();

  ellipse(width / 1.90, height / 2.25, width / 80)
  fill(color(random(255), random(255), random(255)));
  noStroke();

  ellipse(width / 1.61, height / 2.25, width / 80)
  fill(color(random(255), random(255), random(255)));
  noStroke();

  ellipse(width / 1.38, height / 2.25, width / 80)
  fill(color(random(255), random(255), random(255)));
  noStroke();
  ellipse(width / 2.28, height / 2.25, width / 80)


  if (mySong.isPlaying()) {
    var volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 0, width);
    imageMode(CENTER);
    if (frameCount > 5) {
      image(random(img), random(0, width), random(0, height), volume, volume)
    }

    translate(width / 2, height / 2);


    // spectrum

    var spectrum = fft.analyze();


    for (var i = 0; i < spectrum.length; i++) {
      var angle = map(i, 0, spectrum.length, 0, 360);
      var amp = spectrum[i];
      var r = map(amp, 0, 256, 20, 350);
      //var y = map (amp, 0, 256, height, 0);
      //var x = map (amp, 0, 256, width, 0);
      push()
      rotate(frameCount / 100);
      var x = r * cos(angle);
      var y = r * sin(angle);


      //var c = lerpColor(c1, c2);
      strokeWeight(2);
      stroke(i, i, i);
      line(0, 0, x, y);


    }

    //Circles
    var myRate;
    mySong.rate(myRate);

    rotate(myRate * 4);
    line(300, 0, cos(myRate * 3) * 300, sin(myRate * 3) * 300);

    strokeWeight(5);
    stroke(lerpColor(color('#ea0043'), color('#0fefca'), frameCount / 120));
    noFill();

    ellipse(60, 10, 100);
    ellipse(-60, -10, 100);
    ellipse(30, 50, 50);
    ellipse(-60, -10, 50);
    ellipse(120, 20, 100);
    pop()

    image(img1, random(0, width) * amp, random(0, height) * amp, img1.width / 20, img1.height / 20);

  }

}


function mouseClicked() {
  if (mySong.isPlaying()) {
    mySong.pause();
     clear();
      background(0);
  } else {
    mySong.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
