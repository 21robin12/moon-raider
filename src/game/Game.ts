import { Player } from './entities/Player';
import { Enemy } from './entities/Enemy';
import { Visualizer } from '../framework/drawing/Visualizer';
import { PointArrays } from "../framework/drawing/PointArrays";
import { Vector2D } from "../framework/physics/Vector2D";
import { System } from './System';

export class Game {
    system: System;
    visualizer: Visualizer;
    lastFrameMs: number;
    canvas: any;
    canvasContext: any;

    constructor() {
        this.system = new System(this);
        this.canvas = document.getElementById('canvas');
        this.canvasContext = this.canvas.getContext('2d');
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
        for(var entity of this.system.entities) {
            entity.evolve(this.system, dt);
        }
    }

    private drawEverything() {
        this.visualizer.setCamera(this.system.player); // TODO where should this live?
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid(); // TODO grid should be an entity since it's something that gets drawn

        for(var entity of this.system.entities) {
            entity.draw(this.visualizer);
        }

        this.visualizer.drawDot(new Vector2D(this.system.player.mousePosition.x, this.system.player.mousePosition.y), "lime", 4);
    }

    // TODO for development - remove
    private drawGrid() {
        var latticeSpacing = 60;

        var startIntervalX = Math.ceil((this.system.player.position.x - this.canvas.width) / latticeSpacing) * latticeSpacing;
        var startIntervalY = Math.ceil((this.system.player.position.y - this.canvas.height) / latticeSpacing) * latticeSpacing;

        for (var x = startIntervalX; x <= startIntervalX +  (2 * this.canvas.width); x += latticeSpacing) {
            for (var y = startIntervalY; y <= startIntervalY + (2 * this.canvas.height); y += latticeSpacing) {
                this.visualizer.drawDot(new Vector2D(x, y));
            }
        }
    }
}