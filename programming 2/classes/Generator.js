let LivingCreature = require('./LivingCreature');
let random = require("./random");

module.exports = class Generator extends LivingCreature {
    constructor(x, y, id) {
        super(x,y,id)
        this.energy = 0;
    }

    generator() {
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells);
        this.energy++;

        if (this.energy >= 15 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            var newPredator = new Predator(newX, newY, 3);
            predatorArr.push(newPredator);
            matrix[newY][newX] = this.id;
            this.energy = 0;

        }
    }

}