export class KeyHandler {
    static relevantKeyCodes: number[] = [32, 37, 38, 39];
    pressedKeyCodes: number[];

    constructor() {
        this.pressedKeyCodes = [];

        var self = this;

        document.onkeydown = function (e) {
            self.onKeyDown(e);
        }

        document.onkeyup = function (e) {
            self.onKeyUp(e);
        }
    }

    private onKeyDown = function (e: any) {
        e = e || window.event;
        if (KeyHandler.relevantKeyCodes.indexOf(e.keyCode) > -1) {
            this.addKey(e.keyCode);
        }
    };

    private onKeyUp = function (e: any) {
        e = e || window.event;
        if (KeyHandler.relevantKeyCodes.indexOf(e.keyCode) > -1) {
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