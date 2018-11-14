function Space() {
    this.planets = [];
    this.ships = [];
    this.sector = 0;
    this.tick = function() {
        for(var i = 0; i < this.planets.length; i++) {
            this.planets[i].tick();
            if(this.planets[i].isBoss && !this.planets[i].alive())
            {
                this.sector++;
                this.newLevel();
                this.planets[i].isBoss = false;
            }
        }
        for(i = 0; i < this.ships.length; i++) {
            this.ships[i].tick();
        }
        this.planets = this.planets.filter(function(value, index, arr) { return !value.empty() })
    };

    this.spawnShip = function(ship, y) {
        ship.x = -120;
        ship.y = y;
        this.ships.push(ship);
    };

    this.calcDifficulty = function() {
        return this.sector + 1; //should this be more complicated ?
    };

    this.newLevel = function() {
        for(var i = 0; i < 10; i++) {
            this.planets.push(new Planet());
        }
        sortArrayObjectsByValue(this.planets, "x");
        this.planets[this.planets.length - 1].isBoss = true; //rightmost planet

        for(i = 0; i < this.planets.length; i++) {
            this.planets[i].calcPower(i + this.sector * 10, this.calcDifficulty());
        }
    };
}
