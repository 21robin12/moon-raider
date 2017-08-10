import { VelocityBody } from "./VelocityBody";
import { LaserBeam } from "./LaserBeam";
import { Constants } from "./Constants";
import { Vector2D } from "./Vector2D";

export abstract class SpaceShip extends VelocityBody {
    laserBeams: LaserBeam[];
    lastLaserBeamMs: number;
    
    constructor(x: number, y: number) {
        super(x, y);
        
        this.laserBeams = [];
        this.lastLaserBeamMs = 0;
    } 

    accelerate(dt: number) { 
        // v = u + at
        var a = Vector2D.fromPolar(this.angle,  Constants.spaceShipAcceleration);
        var at = a.scaleBy(dt); 
        this.velocity = this.velocity.add(at);
    }

    rotateClockwise (dt: number) {
        this.angle += dt * Constants.spaceShipRotationVelocity;
        if (this.angle >= Math.PI * 2) {
            this.angle -= Math.PI * 2;
        }
    } 

    rotateAnticlockwise (dt: number) {
        this.angle -= dt * Constants.spaceShipRotationVelocity;
        if (this.angle <= 0) {
            this.angle += Math.PI * 2;
        }
    }

    shoot() {
        var now = new Date().getTime();
        if(now - this.lastLaserBeamMs > 300) {
            var laserBeam = new LaserBeam(this.position.x, this.position.y, this.angle);
            this.laserBeams.push(laserBeam);
            this.lastLaserBeamMs = now;
        }
    }
} 