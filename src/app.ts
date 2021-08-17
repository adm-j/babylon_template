import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Color3, Material, StandardMaterial, Texture } from "@babylonjs/core";

class App {
    constructor() {
        //create canvas html element and attach to webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        document.body.appendChild(canvas);

        //initialise babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2,
            Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        scene.ambientColor = new Color3(1, 1, 1);

        var cube: Mesh = MeshBuilder.CreateBox("box", { depth: 1 }, scene);

        var testMaterial = new StandardMaterial("testMaterial", scene);

        // testMaterial.diffuseColor = new Color3(1, 0, 1);
        // testMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
        // testMaterial.emissiveColor = new Color3(0, 0, 1);
        // testMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

        testMaterial.diffuseTexture = new Texture(`../textures/Red_brick_wall_texture.JPG`, scene);
        testMaterial.specularTexture = new Texture(`../textures/Red_brick_wall_texture.JPG`, scene);
        testMaterial.emissiveTexture = new Texture(`../textures/Red_brick_wall_texture.JPG`, scene);
        testMaterial.ambientTexture = new Texture(`../textures/Red_brick_wall_texture.JPG`, scene);

        cube.material = testMaterial;

        console.log(scene);
        var light1L: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        // var light2L: HemisphericLight = new HemisphericLight("light2", new Vector3(1, 50, 50), scene);
        // var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        // var floor: Mesh = MeshBuilder.CreateGround("floor",)

        scene.debugLayer.show();

        //hide/show the Inspector
        window.addEventListener("keydown", (e) => {
            //shift+ctrl+alt+I
            if (e.ctrlKey) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}

new App();