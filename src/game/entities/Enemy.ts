import { Game } from '../Game';
import { SpaceShip } from './SpaceShip';
import { IEntity } from './IEntity';
import { Visualizer } from '../../framework/drawing/Visualizer';
import { System } from '../System';
import { PointArrays } from "../../framework/drawing/PointArrays";

export class Enemy extends SpaceShip implements IEntity {
    constructor(x: number, y: number) {
        super(x, y);
    }

    evolve(system: System, dt: number) {
        this.move(dt);
        this.applyDrag(dt);

        this.rotateTowards(system.player.position, dt);

        if (system.player.position.subtract(this.position).magnitude() > 500) {
            this.accelerate(dt);
        }
    }

    draw(visualizer: Visualizer): void {
        visualizer.draw(
            this.position,
            this.angle,
            PointArrays.spaceShip,
            "#777777"
        );
    }
}