import { VelocityBody } from '../../../framework/physics/VelocityBody';
import { LaserBeam } from '../LaserBeam';
import { Vector2D } from '../../../framework/physics/Vector2D';
import { Constants } from '../../../framework/physics/Constants';

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
        var newVelocity = this.velocity.add(at);
        var newSpeed = newVelocity.magnitude();
        if(newSpeed > Constants.spaceShipMaxSpeed) {
            newVelocity = newVelocity.scaleBy(Constants.spaceShipMaxSpeed / newSpeed);
        }
        
        this.velocity = newVelocity;
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

    rotateTowards (position: Vector2D, dt: number) {
        var vectorAlongAngle = Vector2D.fromPolar(this.angle, 1);
        var vectorToPosition = position.subtract(this.position);
        var angleFromThisToPosition = vectorAlongAngle.angleTo(vectorToPosition);

        var minimumRotateAngle = 0.02;
        if (angleFromThisToPosition < -minimumRotateAngle) {
            this.rotateAnticlockwise(dt);
        } else if (angleFromThisToPosition > minimumRotateAngle){
            this.rotateClockwise(dt);
        }
    }

    shoot() {
        var now = new Date().getTime();
        if(now - this.lastLaserBeamMs > 200) {
            var laserBeam = new LaserBeam(this.position.x, this.position.y, this.angle, this.velocity);
            this.laserBeams.push(laserBeam);
            this.lastLaserBeamMs = now;
        }
    }
} 