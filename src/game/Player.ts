import { SpaceShip } from "../physics/SpaceShip";
import { IEvolvable } from "../physics/IEvolvable";
import { Game } from "./Game";

export class Player extends SpaceShip implements IEvolvable {
    game: Game;

    constructor(x: number, y: number, game: Game) {
        super(x, y);
        this.game = game;
    }

    evolve(dt: number) {
        this.move(dt);
        this.applyDrag(dt);

        var self = this;

        var actions = [
            { key: 37, action: function () { self.rotateAnticlockwise(dt); } },
            { key: 38, action: function () { self.accelerate(dt); } },
            { key: 39, action: function () { self.rotateClockwise(dt); } }
        ];

        for (var j = 0; j < actions.length; j++) {
            if (this.game.keyHandler.pressedKeyCodes.indexOf(actions[j].key) > -1) {
                actions[j].action();
            }
        }
    }
}