let LivingCreature = require('./LivingCreature');
let random = require("./random");
let GrassEater = require("./GrassEater")

module.exports = class GeneratorgrassEater extends LivingCreature {
    constructor(x, y, id) {
        super(x, y, id)
        this.energy = 0;
    }
    generate() {
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells);
        this.energy++;

        if (this.energy >= 10 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            var newGrassEater = new GrassEater(newX, newY, 2);
            grassEaterArr.push(newGrassEater);
            matrix[newY][newX] = this.id;
            this.energy = 0;
        }
    }
}