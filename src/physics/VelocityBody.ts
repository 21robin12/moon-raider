import { Vector2D } from "./Vector2D";
import { Constants } from "./Constants"; 

export class VelocityBody {
    position: Vector2D;
    velocity: Vector2D;
    angle: number;

    constructor(x: number, y: number) {
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(0, 0);
        this.angle = 0;
    }

    move(dt: number) {
        // formula: x = x + dx * dt
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
    }

    applyDrag(dt: number) {
        var xdf = this.getDragFactor(this.velocity.x);
        var ydf = this.getDragFactor(this.velocity.y);

        // apply drag once for every ms elapsed 
        // this way, drag is independent of framerate
        var ms = Math.round(dt);
        for (var i = 0; i < ms; i++) {
            this.velocity.x *= xdf;
            this.velocity.y *= ydf;
        }
    }

    private getDragFactor(speed: number) {
        var abs = Math.abs(speed);

        // these "drag factors" are fairly trivial...
        var dragFactor = 1;
        if (abs <= 5) {
            dragFactor = 0.99;
        } else if (abs > 5 && abs <= 7) {
            dragFactor = 0.95;
        } else if (abs > 7 && abs <= 8) {
            dragFactor = 0.9;
        } else if (abs > 8) {
            dragFactor = 0.8 - (abs - 8);
        }

        // ...and so fudging them isn't really a problem
        return 1 - ((1 - dragFactor) * Constants.dragMultiplier);
    }
}