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
        this.angle += dt * Constants.spaceShipRotationVelocity;
        if (this.angle >= Math.PI * 2) {
            this.angle -= Math.PI * 2;
        }
    } 

    rotateAnticlockwise = function (dt: number) {
        this.angle -= dt * Constants.spaceShipRotationVelocity;
        if (this.angle <= 0) {
            this.angle += Math.PI * 2;
        }
    }
} 