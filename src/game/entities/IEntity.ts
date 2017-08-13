import { System } from '../System';
import { Visualizer } from "../../framework/drawing/Visualizer";

export interface IEntity {
    // TODO could have subEntities property in same way as System, then we can evolve/draw subEntities first?!
    draw(visualizer: Visualizer): void;
    evolve(system: System, dt: number): void;
}