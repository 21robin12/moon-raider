import { SpaceShip } from "../physics/SpaceShip";
import { IEvolvable } from "../physics/IEvolvable";
import { Vector2D } from "../physics/Vector2D";
import { Game } from "./Game";

export class Enemy extends SpaceShip implements IEvolvable {
    game: Game;

    constructor(x: number, y: number, game: Game) {
        super(x, y);
        this.game = game;
    }

    evolve(dt: number) {
        this.move(dt);
        this.applyDrag(dt);

        this.rotateTowards(this.game.player.position, dt);

        if (this.game.player.position.subtract(this.position).magnitude() > 500) {
            this.accelerate(dt);
        }
    }
}