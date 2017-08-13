import { Game } from '../Game';
import { IEntity } from './IEntity';
import { Visualizer } from '../../framework/drawing/Visualizer';
import { Vector2D } from "../../framework/physics/Vector2D";
import { System } from '../System';
import { PointArrays } from "../../framework/drawing/PointArrays";
import { SpaceShip } from './components/SpaceShip';

export class Player extends SpaceShip implements IEntity {
    constructor(x: number, y: number) {
        super(x, y);
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
            if (system.inputHandler.pressedKeyCodes.indexOf(actions[j].key) > -1) {
                actions[j].action();
            }
        }

        this.rotateTowards(system.inputHandler.mousePosition, dt);

        if(system.inputHandler.mouseClicked) {
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
}