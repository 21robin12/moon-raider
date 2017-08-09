import { Vector2D } from "../physics/Vector2D";

export class Visualizer {
    canvasContext: any;

    constructor(canvasContext: any) {
        this.canvasContext = canvasContext;
    }

    draw(position: Vector2D, angle: number, pointsArray: Vector2D[], color: string) {
        this.canvasContext.beginPath();

        var isFirst = true;
        for (var i = 0; i < pointsArray.length; i++) {

            // copy to avoid pass by reference
            var point = new Vector2D(pointsArray[i].x, pointsArray[i].y);
            point.rotate(angle);

            if (isFirst) {
                this.canvasContext.moveTo(point.x + position.x, point.y + position.y);
            } else {
                this.canvasContext.lineTo(point.x + position.x, point.y + position.y);
            }

            isFirst = false;
        }

        // final point to reconnect shape
        var lastPoint = new Vector2D(pointsArray[0].x, pointsArray[0].y);
        lastPoint.rotate(angle);
        this.canvasContext.lineTo(lastPoint.x + position.x, lastPoint.y + position.y);

        this.canvasContext.fillStyle = color;
        this.canvasContext.lineWidth = 1;
        this.canvasContext.fill();
        this.canvasContext.stroke();
    }

    drawText(text: string, position: Vector2D, color: string) {
        this.canvasContext.fillStyle = color;
        this.canvasContext.strokeStyle = 'black';
        this.canvasContext.lineWidth = 1;
        this.canvasContext.font = "bold 20px Arial";
        this.canvasContext.textAlign = "center";
        this.canvasContext.fillText(text, position.x, position.y);
        this.canvasContext.strokeText(text, position.x, position.y);
    }
}