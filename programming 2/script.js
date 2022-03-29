function setup() {
    var weath = 'winter'
    var socket = io();

    var side = 30;

    var matrix = [];

    
    let grassCountElement = document.getElementById('grassCount');
    // let grassEaterCountElement = document.getElementById('grassEaterCount');


    socket.on("data", drawCreatures);
    socket.on("weather", function (data)
    {
        weath = data;
    })
    function drawCreatures(data) {
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;

        createCanvas(matrix[0].length * side, matrix.length * side)

        background('#acacac');



        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                        if(weath == "spring")
                        {
                            fill("green")
                        }
                        else if(weath == "summer")
                        {
                            fill("black");
                        }
                        else if(weath == "winter")
                        {
                            fill("white")
                        }
                        else if(weath == "autumn")
                        {
                            fill("#4dffa6")
                        }
                        rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}

function kill() {
    socket.emit("kill")
}