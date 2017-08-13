import { Game } from '../Game';
import { SpaceShip } from './SpaceShip';
import { IEntity } from './IEntity';
import { Visualizer } from '../../framework/drawing/Visualizer';
import { Vector2D } from "../../framework/physics/Vector2D";
import { System } from '../System';
import { PointArrays } from "../../framework/drawing/PointArrays";

export class Player extends SpaceShip implements IEntity {
    game: Game; // TODO remove - keyhandler should store mouse pos
    clientX: number; // TODO maybe these should live on keyhander?
    clientY: number;
    mousePosition: Vector2D;
    mouseClicked: boolean;

    constructor(x: number, y: number, game: Game) {
        super(x, y);
        this.mousePosition = new Vector2D(0, 0);
        this.mouseClicked = false;
        this.game = game;

        var self = this;
        onmousemove = function(e) {
            self.clientX = e.clientX;
            self.clientY = e.clientY;            
        };

        onmousedown = function(e) {
            self.mouseClicked = true;
        };

        onmouseup = function(e) {
            self.mouseClicked = false;
        };
    }

    evolve(system: System, dt: number) {
        this.move(dt);
        this.applyDrag(dt);

        // TODO should an entity be responsible for evolving its subentities? or should they all live on System?
        for(var i = this.laserBeams.length - 1; i >= 0; i--) {
            if (this.laserBeams[i].expired) {
                this.laserBeams.splice(i, 1);
            } else {
                this.laserBeams[i].evolve(system, dt);
            }
        }        
        
        var self = this;

        var actions = [
            { key: 32, action: function () { self.shoot(); } }
        ];

        for (var j = 0; j < actions.length; j++) {
            if (system.keyHandler.pressedKeyCodes.indexOf(actions[j].key) > -1) {
                actions[j].action();
            }
        }

        this.updateMousePosition();
        this.rotateTowards(this.mousePosition, dt);

        if(this.mouseClicked) {
            this.accelerate(dt);
        }
    }

    draw(visualizer: Visualizer): void {
        visualizer.draw(
            this.position,
            this.angle,
            PointArrays.spaceShip,
            "#ddecee"
        );

        for(var laserBeam of this.laserBeams) {
            laserBeam.draw(visualizer);
        }
    }

    private updateMousePosition() {
        var x = this.game.visualizer.camera.x + this.clientX;
        var y = this.game.visualizer.camera.y + this.clientY;
        this.mousePosition = new Vector2D(x, y);
    }
}