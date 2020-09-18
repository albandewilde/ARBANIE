import { Node, Scene, Mesh, StandardMaterial, Color3, SpotLight, Vector3, CubeTexture, Texture, PhysicsImpostor, MeshBuilder, OimoJSPlugin, InstancedMesh, Sound } from "@babylonjs/core";

/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameas
 *      - Transform nodes
 * 
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
export default class FallingElement {
    private scene: Scene;
    private sphereArray: Array<Mesh> = [];
    private _fallingSound: Sound;

    public constructor(scene: Scene) {
        this.scene = scene;
        this._fallingSound = new Sound("falling", "projects/scene/sounds/falling.mp3", this.scene);
    }
    
    private randomNumber(): number {
        var randomZ = Math.floor(Math.random() * Math.floor(2));
        var zMultplier = 0;
        if(randomZ == 0) {
            zMultplier = -20
        }
        else {
            zMultplier = 20
        }

        return zMultplier;
    }

    private newBallInstance(): void {
        var y = 100;
        var randomZ = Math.floor(Math.random() * Math.floor(2));
        var zMultplier = 0;
        if(randomZ == 0) {
            zMultplier = -10
        }
        else {
            zMultplier = 10
        }
        var mySphere = MeshBuilder.CreateSphere("mySphere", {diameter: 1, diameterX: 1}, this.scene);
        mySphere.position = new Vector3(Math.random() * 150 - 10, y, Math.random() * zMultplier - 5);
        mySphere.physicsImpostor = new PhysicsImpostor(mySphere, PhysicsImpostor.SphereImpostor, { mass: 1 }, this.scene);
        this.sphereArray.push(mySphere)

        var ground = this.scene.getMeshByName('ground');
        this.sphereArray.forEach(element => {
            if (element.intersectsMesh(ground, false)) {
                element.dispose()
                this.sphereArray.splice(this.sphereArray.findIndex(x => x === element), 1);
            }

        });
    }

    public createBall(): void {
        setInterval(this.newBallInstance.bind(this), 1000)
    } 

    public playFallingSound(): void {
        this._fallingSound.play();
    }


    /**
     * Called each frame.
     */
    public onUpdate(): void {
    }

    /**
     * Called on a message has been received and sent from a graph.
     * @param message defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    public onMessage(name: string, data: any, sender: any): void {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    }
}
