export class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    rotate(radians: number) {
        var x = (this.x * Math.cos(radians)) - (this.y * Math.sin(radians));
        var y = (this.x * Math.sin(radians)) + (this.y * Math.cos(radians));
        this.x = x;
        this.y = y;
    }

    angleTo(otherVector: Vector2D) {
        var a = this;
        var b = otherVector;
        var crossProduct = a.x * b.x + a.y * b.y;
        return Math.acos(crossProduct / (a.magnitude() * b.magnitude()));
    }

    private magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}