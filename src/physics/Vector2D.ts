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

    private dotProduct(other: Vector2D) {
        return this.x * other.x + this.y * other.y;
    }

    private determinant(other: Vector2D) {
        return this.x * other.y - this.y * other.x;
    }
}