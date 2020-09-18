import { Scene } from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock, StackPanel, Control } from "@babylonjs/gui";

export class Hud {
    private _scene: Scene;
    private _scoreNb: number;
    private _score: TextBlock;
    private _playerUI;
    private _ballsCount: TextBlock;
    private _bCount: number;
    private _noMoreBullets: TextBlock;
    private _stackPannel: StackPanel = new StackPanel();;

    constructor(scene: Scene) {
        this._scene = scene;
        this._scoreNb = 0;
        this._bCount = 15;
                
        this._stackPannel = new StackPanel();
        this._stackPannel.height = "100%";
        this._stackPannel.width = "100%";
        this._stackPannel.top = "14px";
        this._stackPannel.verticalAlignment = 0;

        const playerUI =  AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this._playerUI = playerUI;
        this._playerUI.addControl(this._stackPannel);        

        this.drawScore();
        this.drawBallsCount();
    }

    public updateHud(score: number, bCount: number): void {
        this._score.text = score.toString();
        this._ballsCount.text = "Balls count : " + bCount.toString();
        this._bCount = bCount;
        this._scoreNb = score;
    }

    public drawScore(): void {
        const score = new TextBlock();
        score.name = "score";
        score.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        score.fontSize = "48px";
        score.color = "white";
        score.text = this._scoreNb.toString();
        score.resizeToFit = true;
        score.height = "96px";
        score.width = "220px";
        score.fontFamily = "Viga";
        this._stackPannel.addControl(score);
        this._score = score;
    }

    public drawBallsCount(): void {
        const ballsCount = new TextBlock();
        ballsCount.name = "balls count";
        ballsCount.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        ballsCount.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        ballsCount.fontSize = "48px";
        ballsCount.color = "white";
        ballsCount.text = "Balls count : " + this._bCount.toString();
        ballsCount.resizeToFit = true;
        ballsCount.height = "96px";
        ballsCount.width = "220px";
        ballsCount.fontFamily = "Viga";
        this._stackPannel.addControl(ballsCount);
        this._ballsCount = ballsCount;
    }

    public drawError(): void {
        const text = "NO MORE BULLETS"
        const noMoreBullets = new TextBlock();
        noMoreBullets.name = "error";
        noMoreBullets.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        noMoreBullets.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_CENTER;
        noMoreBullets.fontSize = "52px";
        noMoreBullets.fontWeight = "600";
        noMoreBullets.color = "red";
        noMoreBullets.text = text;
        noMoreBullets.resizeToFit = true;
        noMoreBullets.height = "120px";
        noMoreBullets.width = "250px";
        noMoreBullets.fontFamily = "Viga";
        this._stackPannel.addControl(noMoreBullets);
        this._noMoreBullets = noMoreBullets;

        this._ballsCount.color = "red";
    }

    public removeError(): void {
        this._stackPannel.removeControl( this._noMoreBullets );
        this._ballsCount.color = "white";
    }
    
    public isErrorDrawn() {
        return this._stackPannel.containsControl( this._noMoreBullets );
    }
}