let LivingCreature = require('./LivingCreature');
let random = require("./random");

module.exports = class Predator extends LivingCreature {

    constructor(x, y, id) {
        super(x, y, id)
        this.energy = 8;
        this.getNewCoordinates();
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    mul() {
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)
        if (this.energy >= 12 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            var newPredator = new Predator(newX, newY, this.id);
            predatorArr.push(newPredator);
            matrix[newY][newX] = this.id;
            this.energy = 8;

        }
    }

    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (this.energy > 0 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.id;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy--;
        }

        this.die();
    }

    eat() {
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (this.energy > 0 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = this.id;
            matrix[this.y][this.x] = 0

            this.x = newX;
            this.y = newY;

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.energy++;
            this.mul();
        }
        else {
            this.move()
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }

        }
    }
}
