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

        this.spaceShip = new SpaceShip(0, 0);
        this.keyHandler = new KeyHandler();
        this.visualizer = new Visualizer(this.canvas, this.canvasContext);
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
        var camera = new Vector2D(this.spaceShip.position.x, this.spaceShip.position.y);
        this.visualizer.setCamera(camera);

        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawGrid();

        this.visualizer.draw(
            this.spaceShip.position,
            this.spaceShip.angle,
            PointArrays.spaceShip,
            "#00FFFF"
        );
    }

    // TODO for development - remove
    private drawGrid() {
        for (var i = -10; i <= 10; i++) {
            for (var j = -10; j <= 10; j++) {
                this.visualizer.drawDot(new Vector2D(i * 50, j * 50));
            }
        }
    }
}