import { Enemy } from "../game/Enemy";
import { Player } from "../game/Player";
import { Vector2D } from "../physics/Vector2D";
import { Visualizer } from "../drawing/Visualizer";
import { PointArrays } from "../drawing/PointArrays";
import { KeyHandler } from "./KeyHandler";
import { IEvolvable } from "../physics/IEvolvable";

export class Game {
    player: Player;
    enemy: Enemy;
    keyHandler: KeyHandler;
    visualizer: Visualizer;
    lastFrameMs: number;
    canvas: any;
    canvasContext: any;
    evolvables: IEvolvable[];

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvasContext = this.canvas.getContext('2d');

        this.player = new Player(0, 0, this);
        this.enemy = new Enemy(200, 200, this);
        this.keyHandler = new KeyHandler();
        this.visualizer = new Visualizer(this.canvas, this.canvasContext);
        this.lastFrameMs = 0;
        this.evolvables = [this.player, this.enemy];
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
        for (var evolver of this.evolvables) {
            evolver.evolve(dt);
        }
    }

    private drawEverything() {
        this.visualizer.setCamera(this.player);

        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawGrid();

        this.visualizer.draw(
            this.player.position,
            this.player.angle,
            PointArrays.spaceShip,
            "#00FFFF"
        );

        for(var laserBeam of this.player.laserBeams) {
            this.visualizer.drawDot(new Vector2D(laserBeam.position.x, laserBeam.position.y), "red", 2);
        }

        this.visualizer.drawDot(new Vector2D(this.player.mousePosition.x, this.player.mousePosition.y), "lime", 2);

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

        var startIntervalX = Math.ceil((this.player.position.x - this.canvas.width) / latticeSpacing) * latticeSpacing;
        var startIntervalY = Math.ceil((this.player.position.y - this.canvas.height) / latticeSpacing) * latticeSpacing;

        for (var x = startIntervalX; x <= startIntervalX +  (2 * this.canvas.width); x += latticeSpacing) {
            for (var y = startIntervalY; y <= startIntervalY + (2 * this.canvas.height); y += latticeSpacing) {
                this.visualizer.drawDot(new Vector2D(x, y));
            }
        }
    }
}