import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";

const TShirtDesigner = () => {
  const canvasRefFront = useRef(null);

  // Tshirt color area
  const [mainAreaColor, setMainAreaColor] = useState("#000000");

  useEffect(() => {
    console.log('rendered')
    const canvasFront = new fabric.Canvas(canvasRefFront.current, {
      width: 437,
      height: 622,
    });

    // Create polygons for main area, left sleeve, and right sleeve for front
    const mainAreaFront = new fabric.Polygon(
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

    const leftSleeveFront = new fabric.Polygon(
      [
        { x: 356, y: 69 },
        { x: 354, y: 88 },
        { x: 352, y: 108 },
        { x: 351, y: 133 },
        { x: 351, y: 163 },
        { x: 354, y: 193 },
        { x: 362, y: 218 },
        { x: 370, y: 227 },
        { x: 374, y: 235 },
        { x: 379, y: 239 },
        { x: 383, y: 242 },
        { x: 387, y: 247 },
        { x: 392, y: 250 },
        { x: 394, y: 251 },
        { x: 394, y: 256 },
        { x: 395, y: 262 },
        { x: 395, y: 266 },
        { x: 394, y: 268 },
        { x: 380, y: 261 },
        { x: 368, y: 250 },
        { x: 352, y: 226 },
        { x: 342, y: 191 },
        { x: 339, y: 127 },
        { x: 341, y: 88 },
        { x: 345, y: 64 },
        { x: 345, y: 63 },
        { x: 351, y: 63 },
        { x: 355, y: 65 },
        { x: 356, y: 66 },
        { x: 357, y: 68 },
        { x: 356, y: 70 },
      ],
      {
        fill: "white",
        stroke: "black",
        strokeWidth: 2,
        selectable: false,
      }
    );

    const rightSleeveFront = new fabric.Polygon(
      [
        { x: 85, y: 67 },
        { x: 87, y: 92 },
        { x: 89, y: 111 },
        { x: 91, y: 149 },
        { x: 89, y: 174 },
        { x: 85, y: 203 },
        { x: 80, y: 215 },
        { x: 69, y: 232 },
        { x: 60, y: 242 },
        { x: 47, y: 250 },
        { x: 46, y: 268 },
        { x: 68, y: 256 },
        { x: 81, y: 241 },
        { x: 92, y: 223 },
        { x: 104, y: 178 },
        { x: 104, y: 150 },
        { x: 104, y: 122 },
        { x: 101, y: 85 },
        { x: 99, y: 68 },
        { x: 99, y: 61 },
        { x: 93, y: 64 },
        { x: 86, y: 65 },
        { x: 85, y: 66 },
      ],
      {
        fill: "white",
        stroke: "black",
        strokeWidth: 2,
        selectable: false,
      }
    );

    // Add polygons to front canvas
    canvasFront.add(mainAreaFront, leftSleeveFront, rightSleeveFront);
    canvasFront.renderAll();


    // canvasFront.on('mouse:down', () => {
    //     setMainAreaColor(mainAreaColor);
    //   });


    // canvasBack.renderAll();
  }, [mainAreaColor]);

  const handleCanvasClick = () => {
    // Handle canvas click event if needed
  };

  return (
    <div>
      <label>
        T-Shirt Color:
        <input
          type="color"
          value={mainAreaColor}
          onChange={(e) => {
            console.log(e.target.value);
            setMainAreaColor(e.target.value);
          }}
        />
      </label>
      <div>
        <canvas onClick={() => {console.log(mainAreaColor)}} ref={canvasRefFront} />
      </div>
    </div>
  );
};

export default TShirtDesigner;
