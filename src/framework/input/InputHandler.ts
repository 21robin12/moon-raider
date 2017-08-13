import { Vector2D } from '../physics/Vector2D';

export class InputHandler {
    static relevantKeyCodes: number[] = [32, 37, 38, 39];

    clientX: number;
    clientY: number;
    mousePosition: Vector2D;
    mouseClicked: boolean;
    pressedKeyCodes: number[];

    constructor() {
        this.mousePosition = new Vector2D(0, 0);
        this.mouseClicked = false;
        this.pressedKeyCodes = [];
        
        var self = this;

        document.onkeydown = function (e) {
            self.onKeyDown(e);
        }

        document.onkeyup = function (e) {
            self.onKeyUp(e);
        }

        document.onmousemove = function(e) {
            self.clientX = e.clientX;
            self.clientY = e.clientY;            
        };

        document.onmousedown = function(e) {
            self.mouseClicked = true;
        };

        document.onmouseup = function(e) {
            self.mouseClicked = false;
        };
    }

    updateMousePosition(camera: Vector2D) {
        var x = camera.x + this.clientX;
        var y = camera.y + this.clientY;
        this.mousePosition = new Vector2D(x, y);
    }

    private onKeyDown = function (e: any) {
        e = e || window.event;
        if (InputHandler.relevantKeyCodes.indexOf(e.keyCode) > -1) {
            this.addKey(e.keyCode);
        }
    };

    private onKeyUp = function (e: any) {
        e = e || window.event;
        if (InputHandler.relevantKeyCodes.indexOf(e.keyCode) > -1) {
            this.removeKey(e.keyCode);
        }
    };

    private addKey = function (keyCode: number) {
        var index = this.pressedKeyCodes.indexOf(keyCode);
        if (index < 0) {
            this.pressedKeyCodes.push(keyCode);
        }
    }

    private removeKey = function (keyCode: number) {
        var index = this.pressedKeyCodes.indexOf(keyCode);
        if (index > -1) {
            this.pressedKeyCodes.splice(index, 1);
        }
    }
}