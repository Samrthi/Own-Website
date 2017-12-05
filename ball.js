window.addEventListener("load", myApp, false);

function myApp() {

  //          got this part off stackoverflow
  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }
  //

  var canvas;
  var t;
  var context;
  var circle
  var circleR;
  var circleX;
  var circleY;
  var circleC;
  var counter;
  var o;
  var up;
  var bounceCount;
  var m, c;
  var height;
  var xMomentum;
  var text = "";

  function getCanvas() {
    var tmp;

    tmp = document.getElementById("mycanvas");

    if (tmp == null) {
      alert("no canvas");
    }

    return tmp;

  }

  function animateMe() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(text,100,100);

    function f(height) {
      m = canvas.height / (canvas.height - (canvas.height - height))
      c = -m * (canvas.height - height)
    }


    height = canvas.height - (bounceCount * (30 - bounceCount / 2))

    f(height)

    if (bounceCount < 30) {
      circleY -= up * ((circleY * m + c) / 10);
    }


    if (bounceCount >= 30) {
      xMomentum = 0;
    }

    circleX += xMomentum;

    if (circleY <= bounceCount * (30 - bounceCount / 2) + (11 * (height / canvas.height))) {
      up = -1;
    }

    if (circleY >= canvas.height - 50 && up == -1) {
      up = 1;
      bounceCount++;
      xMomentum = ((30 - bounceCount) / 30) * xMomentumInit;
    }

    context.beginPath();
    context.arc(circleX, circleY, circleR, 0, 2 * Math.PI);
    context.fillStyle = circleC;
    context.fill();

    t += 1;

    requestAnimationFrame(animateMe);
  }

  canvas = getCanvas();
  context = canvas.getContext("2d");


  init();

  function init() {

    circleR = 50;
    circleX = 50;
    circleY = canvas.height - 50;
    circleC = "black";
    counter = 0;
    t = 0;
    up = 1;
    bounceCount = 0;
    xMomentum = 0.5;
    xMomentumInit = 0.5;
    if (getWidth() < 500) {
      xMomentumInit = getWidth() / 1000
    }



    animateMe();
  }

}
