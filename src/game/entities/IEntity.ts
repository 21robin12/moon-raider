import { System } from '../System';
import { Visualizer } from "../../framework/drawing/Visualizer";

export interface IEntity {
    // Evolve the state of the entity over a time interval dt.
    evolve(system: System, dt: number): void;

    // Draw the entity. Only requires state of entity and visualizer. If something 
    // else from System is required, it should be obtained during evolve().
    draw(visualizer: Visualizer): void; 
}