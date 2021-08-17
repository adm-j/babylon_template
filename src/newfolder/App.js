import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

class App {
    constructor() {
        var canvas = document.createElement("canvas");
        canvas.style.width = "80%";
        canvas.style.height = "80%";
        document.appendChild(canvas);
        //adds canvas to /public/index.html

        var engine = new Engine(canvas, true);
        //initialise engine utilising the canvas
        var scene = new Scene(engine);
        //initialise new scene object with engine

        var camera = new ArcRotateCamera(
            "Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        var light1 = new HemisphericLight(
            "light1", new Vector3(1, 1, 0), scene);
        var sphere = MeshBuilder.CreateSphere("Spehere", { diameter: 1 }, scene);

        window.addEventListener("keydown", (e) => {
            if (e.ctrlKey) {
                console.log("ctrl pressed");
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });
        engine.runRenderLoop(() => {
            scene.render();
        })
    }
}

new App();