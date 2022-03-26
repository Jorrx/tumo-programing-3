var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

grassArr = []
grassEaterArr = []
predatorArr = []
generatorArr = []
generatorgrassEaterArr = []

matrixGenerator(20, 1, 1);
    

function createObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var newGrass = new Grass(x, y, 1);
                grassArr.push(newGrass);
            }
            else if (matrix[y][x] == 2) {
                var newGrassEater = new GrassEater(x, y, 2);
                grassEaterArr.push(newGrassEater);
            }
            else if (matrix[y][x] == 3) {
                var newPredator = new Predator(x, y, 3);
                predatorArr.push(newPredator);

            }
            else if (matrix[y][x] == 4) {
                var newGenerator = new Generator(x, y, 4);
                generatorArr.push(newGenerator);

            }
            else if (matrix[y][x] == 5) {
                var newGeneratorgrassEater = new GeneratorgrassEater(x, y, 5);
                generatorgrassEaterArr.push(newGeneratorgrassEater);
            }
        }

    }
}

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

function generateMatrix(size) {
    var newMatrix = [];
    for (var y = 0; y < size; y++) {
        newMatrix[y] = [];
        for (var x = 0; x < size; x++) {
            var randomId = random(100);
            if (randomId < 50) {
                newMatrix[y][x] = 1;
            }
            else if (randomId < 55) {
                newMatrix[y][x] = 2;
            }
            else if (randomId < 57) {
                newMatrix[y][x] = 3;
            }
            else if (randomId < 60) {
                newMatrix[y][x] = 4;
            }
            else if (randomId < 65) {
                newMatrix[y][x] = 5;
            }
            else {
                newMatrix[y][x] = 0;
            }
        }
    }
    return newMatrix;

}




function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in generatorArr) {
        generatorArr[i].generator();
    }
    for (var i in generatorgrassEaterArr) {
        generatorgrassEaterArr[i].generatorgrassEater();
    }
}

setInterval(game, 1000)





function kill() {
    grassArr = [];
    grassEaterArr = []
    meatEaterArr = []
    allEaterArr = []
    hunterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}
io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
});
////   Create static Json
var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)
