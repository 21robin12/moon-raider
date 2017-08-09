import { VelocityBody } from "./VelocityBody";
import { Constants } from "./Constants";

export class SpaceShip extends VelocityBody {
    constructor(x: number, y: number) {
        super(x, y);
    }

    accelerate(dt: number) { 
        var a = Constants.spaceShipAcceleration;
        var ddx = a * Math.sin(this.angle);
        var ddy = -(a * Math.cos(this.angle));

        // v = u + at
        this.velocity.x += ddx * dt;
        this.velocity.y += ddy * dt;
    }

    rotateClockwise = function (dt: number) {
        this.theta += dt * Constants.spaceShipRotationVelocity;
    } 

    rotateAnticlockwise = function (dt: number) {
        this.theta -= dt * Constants.spaceShipRotationVelocity;
    }
} 