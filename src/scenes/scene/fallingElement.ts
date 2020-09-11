import { Node, Scene, Mesh, StandardMaterial, Color3, SpotLight, Vector3, CubeTexture, Texture, PhysicsImpostor } from "@babylonjs/core";

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
export default class FallingElement extends Node {
    /**
     * Override constructor.
     * @warn do not fill.
     */


    // @ts-ignore ignoring the super call as we don't want to re-init
    public constructor(name: string, scene: Scene) {}
    private scene: Scene
    
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        console.log('initialize')
        this.scene = new Scene(this.getEngine())
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        console.log('coucou')
        var y = 0;
        for (var index = 0; index < 100; index++) {
            var sphere = Mesh.CreateSphere("Sphere0", 16, 3, this.scene);
    
            sphere.position = new Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);
        
            sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1 }, this.scene);
     
            y += 2;
        }
    
        // Link
        var spheres = [];
        for (index = 0; index < 10; index++) {
            sphere = Mesh.CreateSphere("Sphere0", 16, 1, this.scene);
            spheres.push(sphere);
            sphere.position = new Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);
    
    
            sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1 }, this.scene);
        }
    
        for (index = 0; index < 9; index++) {
            spheres[index].setPhysicsLinkWith(spheres[index + 1], new Vector3(0, 0.5, 0), new Vector3(0, -0.5, 0));
        }
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
