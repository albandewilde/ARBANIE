import { Node, Scene, Mesh, StandardMaterial, Color3, SpotLight, Vector3 } from "@babylonjs/core";

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
export default class Sun extends Node {
    /**
     * Override constructor.
     * @warn do not fill.
     */
    private sun: Mesh;
    private spot: SpotLight;

    // @ts-ignore ignoring the super call as we don't want to re-init
    private constructor(name: string, scene: Scene) {}
    
    
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        this._scene = this.getScene();
        console.log(this._scene)
        this.sun = Mesh.CreateSphere("sun", 10, 4, this._scene);
        this.sun.material = new StandardMaterial("sun", this._scene);
        let test = (this.sun.material as StandardMaterial)
        test.emissiveColor = new Color3(1, 1, 0);
        

        this.spot = new SpotLight("spot", new Vector3(0, 0, 50), new Vector3(0, -1, 0), 17, 1, this._scene);
        this.spot.diffuse = new Color3(1, 1, 1);
        this.spot.specular = new Color3(0, 0, 0);
        this.spot.intensity = 0.3;
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        
        console.log(this.sun.position)
            let isUp: boolean = true

        this._scene.registerBeforeRender(() =>{
            console.log(this.spot.position)
            console.log(isUp)
            this.sun.position = this.spot.position;
            if (isUp) {
                this.spot.position.x += 0.2
                this.spot.position.y += 0.1;
                if (this.spot.position.y > 45){
                    isUp = false
                }
            }
            else {
                this.spot.position.y -= 0.1
                this.spot.position.x += 0.20
                if (this.spot.position.y < 0) {
                    isUp = true
                    this.spot.position.x = 0;
                    this.spot.position.y = 0;                   
                }            
            }
        });

    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
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
