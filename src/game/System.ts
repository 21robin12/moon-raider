import { Player } from './entities/Player';
import { Enemy } from './entities/Enemy';
import { IEntity } from './entities/IEntity';
import { KeyHandler } from '../framework/input/KeyHandler';
import { Game } from './Game';

// Contains all game state and anything required to evolve game state, such as keyboard/mouse inputs
export class System {
    keyHandler: KeyHandler;
    entities: IEntity[];

    player: Player;
    enemy: Enemy;

    constructor(game: Game) { // TODO remove Game
        this.keyHandler = new KeyHandler();

        this.player = new Player(0, 0, game);
        this.enemy = new Enemy(0, 200);

        this.entities = [
            this.player,
            this.enemy
        ];
    }
} 