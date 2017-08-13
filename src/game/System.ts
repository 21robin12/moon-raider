import { Player } from './entities/Player';
import { Enemy } from './entities/Enemy';
import { IEntity } from './entities/IEntity';
import { InputHandler } from '../framework/input/InputHandler';
import { Background } from './entities/Background';
import { Cursor } from './entities/Cursor';

// Contains all game state and anything required to evolve game state, such as keyboard/mouse inputs
export class System {
    inputHandler: InputHandler;
    entities: IEntity[];

    player: Player;
    enemy: Enemy;
    background: Background;
    cursor: Cursor;

    constructor() {
        this.inputHandler = new InputHandler();

        this.player = new Player(0, 0);
        this.enemy = new Enemy(0, 200);
        this.background = new Background();
        this.cursor = new Cursor();

        this.entities = [
            this.player,
            this.enemy,
            this.background,
            this.cursor
        ];
    }
} 