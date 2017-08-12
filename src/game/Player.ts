import { SpaceShip } from "../physics/SpaceShip";
import { IEvolvable } from "../physics/IEvolvable";
import { Vector2D } from "../physics/Vector2D";
import { Game } from "./Game";

export class Player extends SpaceShip implements IEvolvable {
    game: Game;
    clientX: number; // TODO maybe these should live on keyhander?
    clientY: number;
    mousePosition: Vector2D;
    mouseClicked: boolean;

    constructor(x: number, y: number, game: Game) {
        super(x, y);
        this.game = game;
        this.mousePosition = new Vector2D(0, 0);
        this.mouseClicked = false;

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

    evolve(dt: number) {
        this.move(dt);
        this.applyDrag(dt);

        for(var i = this.laserBeams.length - 1; i >= 0; i--) {
            if (this.laserBeams[i].expired) {
                this.laserBeams.splice(i, 1);
            } else {
                this.laserBeams[i].evolve(dt);
            }
        }        
        
        var self = this;

        var actions = [
            { key: 32, action: function () { self.shoot(); } }
        ];

        for (var j = 0; j < actions.length; j++) {
            if (this.game.keyHandler.pressedKeyCodes.indexOf(actions[j].key) > -1) {
                actions[j].action();
            }
        }

        this.updateMousePosition();
        this.rotateTowards(this.mousePosition, dt);

        if(this.mouseClicked) {
            this.accelerate(dt);
        }
    }

    private updateMousePosition() {
        var x = this.game.visualizer.camera.x + this.clientX;
        var y = this.game.visualizer.camera.y + this.clientY;
        this.mousePosition = new Vector2D(x, y);
    }
}