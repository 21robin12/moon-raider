import { VelocityBody } from "../../framework/physics/VelocityBody";
import { IEntity } from './IEntity';
import { Vector2D } from "../../framework/physics/Vector2D";
import { Visualizer } from '../../framework/drawing/Visualizer';
import { System } from '../System';

export class LaserBeam extends VelocityBody implements IEntity {
    createdAtMs: number;
    expired: boolean;

    constructor(x: number, y: number, angle: number, velocityBoost: Vector2D) {
        super(x, y);
        this.angle = angle;
        this.velocity = Vector2D.fromPolar(angle, 0.5).add(velocityBoost);
        this.createdAtMs = new Date().getTime();
    }

    evolve(system: System, dt: number) {
        this.move(dt);
        if(new Date().getTime() - this.createdAtMs > 3000) {
            this.expired = true;
        }
    }

    draw(visualizer: Visualizer): void {
        visualizer.drawLine(new Vector2D(this.position.x, this.position.y), this.angle, 20, "lime", 2); // TODO why new vector2D here? can I just pass pos?
    }
}