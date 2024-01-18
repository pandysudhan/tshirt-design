import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";

const TShirtDesigner = () => {
  const canvasRefFront = useRef(null);
  const [mainAreaColor, setMainAreaColor] = useState("#555555");
  const [canvasFront, setCanvasFront] = useState(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRefFront.current, {
      width: 437,
      height: 622,
    });

    const mainAreaFront = new fabric.Polygon(
      // ... (your initial points)
      [
        { x: 98, y: 62 },
        { x: 99, y: 78 },
        { x: 101, y: 97 },
        { x: 103, y: 134 },
        { x: 103, y: 151 },
        { x: 102, y: 169 },
        { x: 98, y: 197 },
        { x: 93, y: 216 },
        { x: 90, y: 224 },
        { x: 78, y: 245 },
        { x: 68, y: 255 },
        { x: 56, y: 263 },
        { x: 47, y: 267 },
        { x: 46, y: 268 },
        { x: 46, y: 597 },
        { x: 47, y: 599 },
        { x: 65, y: 600 },
        { x: 78, y: 602 },
        { x: 98, y: 604 },
        { x: 111, y: 605 },
        { x: 124, y: 606 },
        { x: 172, y: 604 },
        { x: 257, y: 604 },
        { x: 289, y: 605 },
        { x: 332, y: 606 },
        { x: 357, y: 604 },
        { x: 382, y: 600 },
        { x: 394, y: 599 },
        { x: 394, y: 268 },
        { x: 382, y: 262 },
        { x: 374, y: 256 },
        { x: 364, y: 245 },
        { x: 355, y: 230 },
        { x: 347, y: 215 },
        { x: 342, y: 191 },
        { x: 339, y: 160 },
        { x: 338, y: 139 },
        { x: 339, y: 103 },
        { x: 340, y: 91 },
        { x: 341, y: 80 },
        { x: 344, y: 62 },
        { x: 330, y: 57 },
        { x: 310, y: 50 },
        { x: 292, y: 43 },
        { x: 287, y: 55 },
        { x: 275, y: 84 },
        { x: 259, y: 108 },
        { x: 244, y: 123 },
        { x: 221, y: 135 },
        { x: 197, y: 122 },
        { x: 189, y: 116 },
        { x: 182, y: 110 },
        { x: 178, y: 104 },
        { x: 168, y: 87 },
        { x: 157, y: 64 },
        { x: 152, y: 50 },
        { x: 151, y: 39 },
        { x: 144, y: 42 },
        { x: 124, y: 50 },
        { x: 99, y: 60 },
        { x: 98, y: 62 },
      ],
      {
        fill: mainAreaColor,
        stroke: "black",
        strokeWidth: 2,
        selectable: false,
      }
    );

    canvas.add(mainAreaFront);
    setCanvasFront(canvas);
  }, [mainAreaColor]); // Run this effect whenever mainAreaColor changes

  useEffect(() => {
    if (canvasFront) {
      const objects = canvasFront.getObjects();
      objects.forEach((obj) => {
        if (obj.type === "polygon") {
          obj.set({ fill: mainAreaColor });
        }
      });
      canvasFront.renderAll();
    }
  }, [mainAreaColor, canvasFront]);

  return (
    <div>
      <label>
        T-Shirt Color:
        <input
          type="color"
          value={mainAreaColor}
          onChange={(e) => setMainAreaColor(e.target.value)}
        />
      </label>
      <div>
        <canvas ref={canvasRefFront} />
      </div>
    </div>
  );
};

export default TShirtDesigner;
