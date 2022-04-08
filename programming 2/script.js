
var socket = io();
function setup() {
    var weath = 'winter'
    var side = 25;
    var matrix = [];


    let grassCountElement = document.getElementById('grassCount');
    // let grassEaterCountElement = document.getElementById('grassEaterCount');


    socket.on("data", drawCreatures);
    socket.on("weather", function (data) {
        weath = data;
    })
    function drawCreatures(data) {
        matrix = data.matrix;
        // grassCountElement.innerText = data.grassCounter;

        createCanvas(matrix[0].length * side, matrix.length * side)

        background('#acacac');


        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 1) {
                    if (weath === "spring") {
                        fill("#90EE90")
                    }
                    else if (weath === "summer") {
                        fill("#228B22");
                    }
                    else if (weath === "winter") {
                        fill("white")
                    }
                    else if (weath === "autumn") {
                        fill("#green")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] === 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] === 3) {
                    fill('#black');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] === 4) {
                    fill('red');
                    rect(j * side, i * side, side, side);   
                } else if (matrix[i][j] === 5) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}
function kill() {
    socket.emit("kill");
  }