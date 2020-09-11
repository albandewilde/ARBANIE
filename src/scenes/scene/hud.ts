import { Scene } from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock, StackPanel } from "@babylonjs/gui";

export class Hud {
    private _scene: Scene;
    private _scoreNb: number;
    private _score: TextBlock;
    private _playerUI;

    constructor(scene: Scene) {
        this._scene = scene;
        this._scoreNb = 0;

        const playerUI =  AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this._playerUI = playerUI;

        const stackPanel = new StackPanel();
        stackPanel.height = "100%";
        stackPanel.width = "100%";
        stackPanel.top = "14px";
        stackPanel.verticalAlignment = 0;
        
        playerUI.addControl(stackPanel);
        const score = new TextBlock();
        score.name = "clock";
        score.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        score.fontSize = "48px";
        score.color = "white";
        score.text = this._scoreNb.toString();
        score.resizeToFit = true;
        score.height = "96px";
        score.width = "220px";
        score.fontFamily = "Viga";
        stackPanel.addControl(score);
        this._score = score;
    }

    public updateHud(score: number): void {
        this._score.text = score.toString();
        this._scoreNb = score;
    }
}