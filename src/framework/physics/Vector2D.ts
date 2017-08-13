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

    angleTo(other: Vector2D) {
        return Math.atan2(this.determinant(other), this.dotProduct(other));
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    scaleBy(scaleFactor: number) {
        return new Vector2D(this.x * scaleFactor, this.y * scaleFactor);
    }

    add(other: Vector2D) {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vector2D) {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }

    distanceTo(other: Vector2D) {
        return this.subtract(other).magnitude();
    }

    static fromPolar(angle: number, magnitude: number) {
        return new Vector2D(magnitude * Math.sin(angle), -magnitude * Math.cos(angle));
    }

    private dotProduct(other: Vector2D) {
        return this.x * other.x + this.y * other.y;
    }

    private determinant(other: Vector2D) {
        return this.x * other.y - this.y * other.x;
    }
}