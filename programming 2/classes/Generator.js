let LivingCreature = require('./LivingCreature');
let random = require("./random");
let Predator = require("./Predator")

module.exports = class Generator extends LivingCreature {
    constructor(x, y, id) {
        super(x, y, id)
        this.energy = 0;
        this.timer = 0;
    }

    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    chooseCell(character) {
        this.getNewCordinates();
        return super.chooseCell(character);
    }

    generate() {
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells);

        if (this.timer % 20 === 0 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            var newPredator = new Predator(newX, newY, this.id - 2);
            predatorArr.push(newPredator);
            matrix[newY][newX] = this.id - 2;

            this.die();
        }
        this.timer++;
    }

    die() {
        if (this.timer >= 40) {
            matrix[this.y][this.x] = 0;

            for (var i in generatorArr) {
                if (
                    generatorArr[i].x === this.x &&
                    generatorArr[i].y === this.y
                ) {
                    generatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}