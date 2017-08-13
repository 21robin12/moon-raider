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
        this.system = new System();
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

        var camera = this.getCamera();
        this.system.inputHandler.updateMousePosition(camera);
        this.visualizer.camera = camera;
        
        this.evolve(dt);
        this.drawEverything();
    }

    private evolve(dt: number) {
        for(var entity of this.system.entities) {
            entity.evolve(this.system, dt);
        }
    }

    private drawEverything() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height); 

        for(var entity of this.system.entities) {
            entity.draw(this.visualizer);
        }
    }

    private getCamera() {
        var offsetMultiplier = 700;
        var x = this.system.player.position.x - (this.system.player.velocity.x * offsetMultiplier) - this.canvas.width / 2;
        var y = this.system.player.position.y - (this.system.player.velocity.y * offsetMultiplier) - this.canvas.height / 2;
        return new Vector2D(x, y);
    }
}