import { VelocityBody } from "../../framework/physics/VelocityBody";
import { IEntity } from './IEntity';
import { Vector2D } from "../../framework/physics/Vector2D";
import { Visualizer } from '../../framework/drawing/Visualizer';
import { System } from '../System';
import { SpaceShip } from './components/SpaceShip';

export class LaserBeam extends VelocityBody implements IEntity {
    createdAtMs: number;
    expired: boolean;
    createdBy: SpaceShip;

    constructor(x: number, y: number, angle: number, createdBy: SpaceShip) {
        super(x, y);
        this.angle = angle;
        this.velocity = Vector2D.fromPolar(angle, 0.5).add(createdBy.velocity);
        this.createdAtMs = new Date().getTime();
        this.createdBy = createdBy;
    }

    evolve(system: System, dt: number) {
        if(new Date().getTime() - this.createdAtMs > 3000) {
            this.expired = true;
        } else {
            this.move(dt);
            var spaceShips = [system.player, system.enemy];
            for(var spaceShip of spaceShips) {
                if (spaceShip !== this.createdBy && this.position.distanceTo(spaceShip.position) < 30) {
                    this.expired = true;
                    // TODO damage ship
                }
            }
        } 
    }

    draw(visualizer: Visualizer): void {
        if (!this.expired) {
            visualizer.drawLine(this.position, this.angle, 20, "lime", 2);
        }
    }
}