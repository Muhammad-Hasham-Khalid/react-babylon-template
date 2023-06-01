import { useRef } from "react";
import { useEffectAsync } from "./hooks/useEffectAsync";
import { BasicSceneController } from "./babylon/scenes/basic-scene-controller";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffectAsync(async () => {
    if (canvasRef.current === null) {
      return;
    }

    // create scene object
    const scene = new BasicSceneController(canvasRef.current, { debug: true });

    // initialize scene
    await scene.initialize();

    // cleanup on unmount
    return () => scene.dispose();
  }, []);

  return <canvas ref={canvasRef} />;
}

export default App;
