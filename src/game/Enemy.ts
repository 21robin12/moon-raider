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

        var vectorAlongEnemyAngle = Vector2D.fromPolar(this.angle, 1);
        var vectorBetweenEnemyAndPlayer = this.game.player.position.subtract(this.position);
        var angleFromEnemyToPlayer = vectorAlongEnemyAngle.angleTo(vectorBetweenEnemyAndPlayer);

        if (angleFromEnemyToPlayer < 0) {
            this.rotateAnticlockwise(dt);
        } else {
            this.rotateClockwise(dt);
        }

        if (vectorBetweenEnemyAndPlayer.magnitude() > 300) {
            this.accelerate(dt);
        }
    }
}