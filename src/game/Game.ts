import { SpaceShip } from "../physics/SpaceShip";
import { Vector2D } from "../physics/Vector2D";
import { Visualizer } from "../drawing/Visualizer";
import { PointArrays } from "../drawing/PointArrays";
import { KeyHandler } from "./KeyHandler";

export class Game {
    spaceShip: SpaceShip;
    enemy: SpaceShip;
    keyHandler: KeyHandler;
    visualizer: Visualizer;
    lastFrameMs: number;
    canvas: any;
    canvasContext: any;

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvasContext = this.canvas.getContext('2d');

        this.spaceShip = new SpaceShip(0, 0);
        this.enemy = new SpaceShip(200, 200);
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
        // spaceship
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

        // enemy
        var vectorAlongEnemyAngle = new Vector2D(Math.sin(this.enemy.angle), -Math.cos(this.enemy.angle));
        var vectorBetweenEnemyAndPlayer = new Vector2D(this.spaceShip.position.x - this.enemy.position.x, this.spaceShip.position.y - this.enemy.position.y);
        var angleFromEnemyToPlayer = vectorAlongEnemyAngle.angleTo(vectorBetweenEnemyAndPlayer);

        if (angleFromEnemyToPlayer < 0) {
            this.enemy.rotateAnticlockwise(dt);
        } else {
            this.enemy.rotateClockwise(dt);
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

        this.visualizer.draw(
            this.enemy.position,
            this.enemy.angle,
            PointArrays.spaceShip,
            "#FF00FF"
        );
    }

    // TODO for development - remove
    private drawGrid() {
        var latticeSpacing = 60;

        var startIntervalX = Math.ceil((this.spaceShip.position.x - this.canvas.width) / latticeSpacing) * latticeSpacing;
        var startIntervalY = Math.ceil((this.spaceShip.position.y - this.canvas.height) / latticeSpacing) * latticeSpacing;

        for (var x = startIntervalX; x <= startIntervalX +  (2 * this.canvas.width); x += latticeSpacing) {
            for (var y = startIntervalY; y <= startIntervalY + (2 * this.canvas.height); y += latticeSpacing) {
                this.visualizer.drawDot(new Vector2D(x, y));
            }
        }
    }
}