import { IEntity } from './IEntity';
import { Visualizer } from '../../framework/drawing/Visualizer';
import { System } from '../System';
import { Vector2D } from '../../framework/physics/Vector2D';

export class Background implements IEntity {
    playerPosition: Vector2D;    
    
    evolve(system: System, dt: number): void {
        this.playerPosition = system.player.position;
    }

    draw(visualizer: Visualizer): void {
        var latticeSpacing = 60;
        
        var startIntervalX = Math.ceil((this.playerPosition.x - visualizer.canvas.width) / latticeSpacing) * latticeSpacing;
        var startIntervalY = Math.ceil((this.playerPosition.y - visualizer.canvas.height) / latticeSpacing) * latticeSpacing;

        for (var x = startIntervalX; x <= startIntervalX +  (2 * visualizer.canvas.width); x += latticeSpacing) {
            for (var y = startIntervalY; y <= startIntervalY + (2 * visualizer.canvas.height); y += latticeSpacing) {
                visualizer.drawDot(new Vector2D(x, y), "white", 2);
            }
        }
    }
}