import { Player } from './entities/Player';
import { Enemy } from './entities/Enemy';
import { IEntity } from './entities/IEntity';
import { InputHandler } from '../framework/input/InputHandler';
import { Game } from './Game';

// Contains all game state and anything required to evolve game state, such as keyboard/mouse inputs
export class System {
    inputHandler: InputHandler;
    entities: IEntity[];

    player: Player;
    enemy: Enemy;

    constructor(game: Game) { // TODO remove Game
        this.inputHandler = new InputHandler();

        this.player = new Player(0, 0, game);
        this.enemy = new Enemy(0, 200);

        this.entities = [
            this.player,
            this.enemy
        ];
    }
} 