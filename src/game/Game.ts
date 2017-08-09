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
        this.visualizer.setCamera(this.spaceShip);

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
        console.log(this.spaceShip.position);

        var latticeSpacing = 100;
        var bufferWidth = 7; // to account for camera lag behind ship at velocity

        var bufferDistance = latticeSpacing * bufferWidth;

        var startIntervalX = (Math.ceil((this.spaceShip.position.x - (this.canvas.width / 2)) / latticeSpacing) * latticeSpacing) - bufferDistance;
        var startIntervalY = Math.ceil((this.spaceShip.position.y - (this.canvas.height / 2)) / latticeSpacing) * latticeSpacing - bufferDistance;

        for (var x = startIntervalX; x <= (startIntervalX + this.canvas.width + bufferDistance) * 2; x += latticeSpacing) {
            for (var y = startIntervalY; y <= (startIntervalY + this.canvas.height + bufferDistance) * 2; y += latticeSpacing) {
                this.visualizer.drawDot(new Vector2D(x, y));
            }
        }
    }
}