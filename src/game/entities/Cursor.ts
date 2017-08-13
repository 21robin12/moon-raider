import { IEntity } from './IEntity';
import { Vector2D } from '../../framework/physics/Vector2D';
import { System } from '../System';
import { Visualizer } from '../../framework/drawing/Visualizer';

export class Cursor implements IEntity {
    mousePosition: Vector2D;

    evolve(system: System, dt: number): void {
        this.mousePosition = system.inputHandler.mousePosition;
    }

    draw(visualizer: Visualizer): void {
        visualizer.drawDot(this.mousePosition, "lime", 4);
    }
}