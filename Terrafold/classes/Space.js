function Space() {
    this.planets = [];
    this.ships = [];
    this.sector = 0;
    this.tick = function() {
        for(var i = 0; i < this.planets.length; i++) {
            this.planets[i].tick();
        }
        for(i = 0; i < this.ships.length; i++) {
            this.ships[i].tick();
        }
        // Intentionally repeat this until we have space to add new planets.
        if(this.planets[this.planets.length - 1].doneBuilding())
        {
            this.newLevel();
        }
        this.planets = this.planets.filter(function(value, index, arr) { return !value.empty() })
    };

    this.spawnShip = function(ship, y) {
        ship.x = -120;
        ship.y = y;
        this.ships.push(ship);
    };

    this.calcDifficulty = function() {
        return this.sector > 0 ? this.sector : 1; //should this be more complicated ?
    };

    this.newLevel = function() {
        // Add a maximum of 40 planets for now? Should we wait until the boss planet is empty before spawning more?
        if(this.planets.length <= 30)
        {
            this.sector++;
            for(var i = 0; i < 10; i++) {
                // If new planets aren't added to this array, they collide. Refactor?
                this.planets.push(new Planet());
            }
            newPlanets = this.planets.slice(this.planets.length - 10, this.planets.length);
            sortArrayObjectsByValue(newPlanets, "x");
            newPlanets[newPlanets.length - 1].isBoss = true; //rightmost new planet

            // Reinsert the new planets into the array
            for(i = this.planets.length - 10, j = 0; i < newPlanets.length; i++, j++) {
                this.planets[i] = newPlanets[j];
                this.planets[i].calcPower(i + this.sector * 10, this.calcDifficulty());
            }
        }
    };
}
