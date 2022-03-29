weath = "winter"

var Grass = require("./classes/Grass");
var GrassEater = require("./classes/GrassEater");
var Predator = require("./classes/Predator");
var Generator = require("./classes/Generator");
var GeneratorgrassEater = require("./classes/GeneratorgrassEater");
var random = require('./classes/random');

var fs = require('fs')

grassArr = []
grassEaterArr = []
predatorArr = []
generatorArr = []
generatorgrassEaterArr = []
matrix = [];

function matrixGenerator(matrixSize, grass, grassEater, predator, generator, generatorgrassEater) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < generator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < generatorgrassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}

matrixGenerator(20, 1, 1);

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

// function generateMatrix(size) {
//     var newMatrix = [];
//     for (var y = 0; y < size; y++) {
//         newMatrix[y] = [];
//         for (var x = 0; x < size; x++) {
//             var randomId = random(100);
//             if (randomId < 50) {
//                 newMatrix[y][x] = 1;
//             }
//             else if (randomId < 55) {
//                 newMatrix[y][x] = 2;
//             }
//             else if (randomId < 57) {
//                 newMatrix[y][x] = 3;
//             }
//             else if (randomId < 60) {
//                 newMatrix[y][x] = 4;
//             }
//             else if (randomId < 65) {
//                 newMatrix[y][x] = 5;
//             }
//             else {
//                 newMatrix[y][x] = 0;
//             }
//         }
//     }
//     return newMatrix;
// }


function createObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                var newGrass = new Grass(x, y, 1);
                grassArr.push(newGrass);
            }
            else if (matrix[y][x] === 2) {
                var newGrassEater = new GrassEater(x, y, 2);
                grassEaterArr.push(newGrassEater);
            }
            else if (matrix[y][x] === 3) {
                var newPredator = new Predator(x, y, 3);
                predatorArr.push(newPredator);

            }
            else if (matrix[y][x] === 4) {
                var newGenerator = new Generator(x, y, 4);
                generatorArr.push(newGenerator);

            }
            else if (matrix[y][x] === 5) {
                var newGeneratorgrassEater = new GeneratorgrassEater(x, y, 5);
                generatorgrassEaterArr.push(newGeneratorgrassEater);
            }
        }

    }
}

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }

    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)

function kill() {
    grassArr = []
    grassEaterArr = []
    predatorArr = []
    generatorArr = []
    generatorgrassEaterArr = []
    matrix = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}

io.on('connection', function (socket) {
    createObjects();
    socket.on("kill", kill);
});
////   Create static Json
var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.generator = generatorArr.length;
    statistics.generatorgrassEater = generatorgrassEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000);
