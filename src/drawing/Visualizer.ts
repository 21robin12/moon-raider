import { Vector2D } from "../physics/Vector2D";
import { SpaceShip } from "../physics/SpaceShip";

export class Visualizer {
    canvas: any;
    canvasContext: any;
    camera: Vector2D;

    constructor(canvas: any, canvasContext: any) {
        this.canvas = canvas;
        this.canvasContext = canvasContext;
        this.camera = new Vector2D(-100, -100);
    }

    setCamera(spaceShip: SpaceShip) {
        var offsetMultiplier = 700;
        this.camera = new Vector2D(spaceShip.position.x - (spaceShip.velocity.x * offsetMultiplier) - this.canvas.width / 2, spaceShip.position.y - (spaceShip.velocity.y * offsetMultiplier) - this.canvas.height / 2);
    }

    draw(position: Vector2D, angle: number, pointsArray: Vector2D[], color: string) {
        this.canvasContext.beginPath();

        var xPosition = (x: any) => x + position.x - this.camera.x;
        var yPosition = (y: any) => y + position.y - this.camera.y;

        var isFirst = true;
        for (var i = 0; i < pointsArray.length; i++) {

            // copy to avoid pass by reference
            var point = new Vector2D(pointsArray[i].x, pointsArray[i].y);
            point.rotate(angle);

            if (isFirst) {
                this.canvasContext.moveTo(xPosition(point.x), yPosition(point.y));
            } else {
                this.canvasContext.lineTo(xPosition(point.x), yPosition(point.y));
            }

            isFirst = false;
        }

        // final point to reconnect shape
        var lastPoint = new Vector2D(pointsArray[0].x, pointsArray[0].y);
        lastPoint.rotate(angle);
        this.canvasContext.lineTo(xPosition(lastPoint.x), yPosition(lastPoint.y));

        this.canvasContext.fillStyle = color;
        this.canvasContext.lineWidth = 1;
        this.canvasContext.fill();
        this.canvasContext.stroke();
    }

    drawDot(position: Vector2D) {
        this.canvasContext.fillStyle = "black";
        this.canvasContext.fillRect(position.x - this.camera.x, position.y - this.camera.y, 2, 2);
    }

    drawText(text: string, position: Vector2D, color: string) {
        this.canvasContext.fillStyle = color;
        this.canvasContext.strokeStyle = 'black';
        this.canvasContext.lineWidth = 1;
        this.canvasContext.font = "bold 20px Arial";
        this.canvasContext.textAlign = "center";
        this.canvasContext.fillText(text, position.x - this.camera.x, position.y - this.camera.y);
        this.canvasContext.strokeText(text, position.x - this.camera.x, position.y - this.camera.y);
    }
}