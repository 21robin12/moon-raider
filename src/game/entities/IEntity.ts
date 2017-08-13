import { System } from '../System';
import { Visualizer } from "../../framework/drawing/Visualizer";

export interface IEntity {
    draw(visualizer: Visualizer): void;
    evolve(system: System, dt: number): void;
}