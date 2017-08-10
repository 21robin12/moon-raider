import { VelocityBody } from "./VelocityBody";
import { IEvolvable } from "./IEvolvable";
import { Vector2D } from "./Vector2D";

export class LaserBeam extends VelocityBody implements IEvolvable {
    createdAtMs: number;
    expired: boolean;

    constructor(x: number, y: number, angle: number, velocityBoost: Vector2D) {
        super(x, y);
        this.angle = angle;
        this.velocity = Vector2D.fromPolar(angle, 0.4).add(velocityBoost);
        this.createdAtMs = new Date().getTime();
    }

    evolve(dt: number) {
        this.move(dt);
        if(new Date().getTime() - this.createdAtMs > 3000) {
            this.expired = true;
        }
    }
}