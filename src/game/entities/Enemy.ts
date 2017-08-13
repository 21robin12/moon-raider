import { Game } from '../Game';
import { SpaceShip } from './SpaceShip';
import { IEntity } from './IEntity';
import { Visualizer } from '../../framework/drawing/Visualizer';

export class Enemy extends SpaceShip implements IEntity {
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

    draw(visualizer: Visualizer): void {
        throw new Error("Method not implemented.");
    }
}