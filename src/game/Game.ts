import { SpaceShip } from "../physics/SpaceShip";
import { Vector2D } from "../physics/Vector2D";
import { Visualizer } from "../drawing/Visualizer";
import { PointArrays } from "../drawing/PointArrays";
import { KeyHandler } from "./KeyHandler";

export class Game {
    spaceShip: SpaceShip;
    keyHandler: KeyHandler;
    visualizer: Visualizer;
    lastFrameMs: number;
    canvas: any;
    canvasContext: any;

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvasContext = this.canvas.getContext('2d');

        this.spaceShip = new SpaceShip(300, 300);
        this.keyHandler = new KeyHandler();
        this.visualizer = new Visualizer(this.canvasContext);
        this.lastFrameMs = 0;
    }

    start() {
        this.lastFrameMs = new Date().getTime();

        var frameInterval = 1000 / 60;

        var self = this;
        setInterval(function () {
            self.doGameStep();
        }, frameInterval);
    }

    private doGameStep() {
        var now = new Date().getTime();
        var dt = now - this.lastFrameMs;
        this.lastFrameMs = now;

        this.evolve(dt);
        this.drawEverything();
    }

    private evolve(dt: number) {

        this.spaceShip.move(dt);
        this.spaceShip.applyDrag(dt); 

        var self = this;

        var actions = [
            { key: 37, action: function () { self.spaceShip.rotateAnticlockwise(dt); } },
            { key: 38, action: function () { self.spaceShip.accelerate(dt); } },
            { key: 39, action: function () { self.spaceShip.rotateClockwise(dt); } }
        ];

        for (var j = 0; j < actions.length; j++) {
            if (this.keyHandler.pressedKeyCodes.indexOf(actions[j].key) > -1) {
                actions[j].action();
            }
        }
    }

    private drawEverything() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.visualizer.drawDot(new Vector2D(100, 100));
        this.visualizer.drawDot(new Vector2D(200, 100));
        this.visualizer.drawDot(new Vector2D(300, 100));
        this.visualizer.drawDot(new Vector2D(400, 100));
        this.visualizer.drawDot(new Vector2D(500, 100));

        this.visualizer.drawDot(new Vector2D(100, 200));
        this.visualizer.drawDot(new Vector2D(200, 200));
        this.visualizer.drawDot(new Vector2D(300, 200));
        this.visualizer.drawDot(new Vector2D(400, 200));
        this.visualizer.drawDot(new Vector2D(500, 200));

        this.visualizer.drawDot(new Vector2D(100, 300));
        this.visualizer.drawDot(new Vector2D(200, 300));
        this.visualizer.drawDot(new Vector2D(300, 300));
        this.visualizer.drawDot(new Vector2D(400, 300));
        this.visualizer.drawDot(new Vector2D(500, 300));

        this.visualizer.drawDot(new Vector2D(100, 400));
        this.visualizer.drawDot(new Vector2D(200, 400));
        this.visualizer.drawDot(new Vector2D(300, 400));
        this.visualizer.drawDot(new Vector2D(400, 400));
        this.visualizer.drawDot(new Vector2D(500, 400));

        this.visualizer.drawDot(new Vector2D(100, 500));
        this.visualizer.drawDot(new Vector2D(200, 500));
        this.visualizer.drawDot(new Vector2D(300, 500));
        this.visualizer.drawDot(new Vector2D(400, 500));
        this.visualizer.drawDot(new Vector2D(500, 500));

        this.visualizer.drawDot(new Vector2D(100, 600));
        this.visualizer.drawDot(new Vector2D(200, 600));
        this.visualizer.drawDot(new Vector2D(300, 600));
        this.visualizer.drawDot(new Vector2D(400, 600));
        this.visualizer.drawDot(new Vector2D(500, 600));

        this.visualizer.draw(
            this.spaceShip.position,
            this.spaceShip.angle,
            PointArrays.spaceShip,
            "#00FFFF"
        );
    }
}