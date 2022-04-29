//car Vs
let car;
let Zturn;
var baseSpeed = 10;
var spdMultiplier = baseSpeed;
var carHeight = 40;
var carTurnInput = 0;

//landascape variables
let yStart = 400;
let heightMultiplier = 0;

//song variables
let song;
var amplvl = 1;

function setup() {
    createCanvas(700, 400, WEBGL)
    angleMode(DEGREES)
    noiseDetail(4)

    frameRate(30)

    //car setup
    car = loadModel('car.obj');

    //music setup
    //song = loadSound('song.mp3');
    // go home and try the live with music but not the model, see what happens

}

function draw() {


    background(30)

    push()
    //neg y moves up 
    translate(0, -height/2, -width)
    drawBack()
    pop()

    push()

    translate(0, 0, -200)
    rotateX(70)
    //rotateZ(frameCount)
    if (keyIsDown(UP_ARROW)) {
        spdMultiplier += 1
    }    
    else
    {
        if (spdMultiplier > baseSpeed) {
            spdMultiplier = spdMultiplier*0.98
        }
    }

    var turnBy = 3

    if (keyIsDown(LEFT_ARROW)) {
        carTurnInput -= turnBy
    } else if (keyIsDown(RIGHT_ARROW)) {
        carTurnInput += turnBy
    } else {
        if (carTurnInput!= 0) {
            if (carTurnInput > 0) {
                carTurnInput -= turnBy
            } else {
                carTurnInput += turnBy
            }
        }
    }    

   // rotateZ(map(carTurnInput, -50, 50, -30, 30))

    //landscapeLogic
    var w = 30
    var start = frameCount / 100

    var yoff = 0
    var yCol = -300

    yStart += 1 * spdMultiplier

    //heightMultiplier = map(noise(frameCount), 0, 1, 0, 4); // set equal to amplitude

    for (var y = yStart; y >= -height; y -= w) {
        xoff = 0;

        if (y > height) {
            xoff += 0.1
            yoff += 0.1
            continue;
        }
        for (var x = -750 + 14; x <= -105; x += w) {
            var h = map(noise(xoff + start, yoff + start), 0, 1, -100, 30) * heightMultiplier

            var r = map(sin(y / 2), -1, 1, 100, 200)
            var g = map(y + 200, 0, 50, 100, 200)
            var b = map(cos(frameCount), -1, 1, 200, 100)
            
            push()
            fill(r, g, b)
            translate(x, y, -h/2)
            box(w,w,h)
            pop()

            xoff += 0.1


            // want as x increases (towards 0) and y decreases (in the negatives), the height gets lower
        }
        for (var x = -105; x <= 105; x += w) {
            if (y < 0 ) {
                var h = map(noise(xoff + start, yoff + start), 0, 1, -100, 30) * 1.5 * map(y, -height, 0, 1, 0)
            }
            else 
            {
                var h = map(noise(xoff + start, yoff + start), 0, 1, -100, 30) * 0.5
            }

            var r = map(sin(y - frameCount / 2), -1, 1, 100, 200)
            var g = map(y, 0, 50, 100, 200)
            var b = map(cos(frameCount), -1, 1, 200, 100)
            
            push()
            fill(r, g, b)
            translate(x, y, -h/2)
            box(w,w,h)
            pop()

            xoff += 0.1
        }
        for (var x = 105; x <= 750-14 ; x += w) {
            var h = map(noise(xoff + start, yoff +  start), 0, 1, -100, 30) * heightMultiplier

            var r = map(sin(y / 2), -1, 1, 100, 200)
            var g = map(y, 0, 50, 100, 200)
            var b = map(cos(frameCount), -1, 1, 200, 100)
            
            push()
            fill(r, g, b)
            translate(x, y, -h/2)
            box(w,w,h)
            pop()

            xoff += 0.1
        }
        yCol += 30
        yoff += 0.1
    }

    // carLogic
    carDraw()
    pop()


}


function carDraw() {

    //idea: set a rectangle around the car and anything in this rectagle height goes to 0
    push()
    //need to move Carheight Dynamically
    carHeight = map(noise(frameCount), 0, 1, 40 - 2, 40 + 2)
    translate(0, 250, carHeight)
    scale(40);
    rotateY(180)
    rotateX(270)

    var carTurn = map(carTurnInput, -50, 50, -10, 10)
    var carMove = map(carTurnInput, -100, 100, 5, -5)
    translate(carMove, 0, 0)
    rotateY(carTurn)
    rotateX(-abs(carTurn)) // add to Y to turn in a direction


    

//    Zturn = map(mouseX, 0, width, -20, 20)
//     Yturn = map(mouseX, 0, width, -50, 50)
//     rotateZ(Zturn)
//     rotateY(Yturn)


   normalMaterial()
   model(car);
    pop()
}
function mousePressed(event) {
    //song.play()
}

function drawBack() {
    //var amplvl = map(noise(frameCount), 0, 1, 0, 400); 
    var size = 500  * amplvl
    stroke = color(0,0,0)  
    ellipse(0, 0, size, size)
}
