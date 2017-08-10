import { VelocityBody } from "./VelocityBody";
import { IEvolvable } from "./IEvolvable";
import { Vector2D } from "./Vector2D";

export class LaserBeam extends VelocityBody implements IEvolvable {
    constructor(x: number, y: number, angle: number) {
        super(x, y);
        this.angle = angle;
        this.velocity = Vector2D.fromPolar(angle, 0.01);
    }

    evolve(dt: number) {
          
    }
}