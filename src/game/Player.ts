import { SpaceShip } from "../physics/SpaceShip";
import { IEvolver } from "../physics/IEvolver";

export class Player extends SpaceShip implements IEvolver {
    constructor(x: number, y: number) {
        super(x, y);
    }

    evolve(dt: number) {
        this.move(dt);
        this.applyDrag(dt);
    }
}