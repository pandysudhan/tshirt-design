import React, { useEffect, useState } from "react";
import Konva from "konva";

const CustomTShirt = ({
  mainBodyVertices,
  leftSleeveVertices,
  rightSleeveVertices,
}) => {
  const [mainBodyColor, setMainBodyColor] = useState("#3498db");
  const [leftSleeveColor, setLeftSleeveColor] = useState("#e74c3c");
  const [rightSleeveColor, setRightSleeveColor] = useState("#e74c3c");
  const [borderWidth, setBorderWidth] = useState(1);

  const handleMainBodyColorChange = (color) => {
    setMainBodyColor(color);
  };

  const handleLeftSleeveColorChange = (color) => {
    setLeftSleeveColor(color);
  };

  const handleRightSleeveColorChange = (color) => {
    setRightSleeveColor(color);
  };

  const handleBorderWidthChange = (e) => {
    setBorderWidth(parseInt(e.target.value, 10));
  };

  const handleMainBodyColorInputChange = (e) => {
    setMainBodyColor(e.target.value);
  };

  const handleLeftSleeveColorInputChange = (e) => {
    setLeftSleeveColor(e.target.value);
  };

  const handleRightSleeveColorInputChange = (e) => {
    setRightSleeveColor(e.target.value);
  };

  useEffect(() => {
    const stage = new Konva.Stage({
      container: "stage-container",
      width: 437,
      height: 622,
    });

    const layer = new Konva.Layer();

    // Main body
    const mainBody = new Konva.Line({
      points: mainBodyVertices || [
        98, 62, 99, 78, 101, 97, 103, 134, 103, 151, 102, 169, 98, 197, 93, 216,
        90, 224, 78, 245, 68, 255, 56, 263, 47, 267, 46, 268, 46, 597, 47, 599,
        65, 600, 78, 602, 98, 604, 111, 605, 124, 606, 172, 604, 257, 604, 289,
        605, 332, 606, 357, 604, 382, 600, 394, 599, 394, 268, 382, 262, 374,
        256, 364, 245, 355, 230, 347, 215, 342, 191, 339, 160, 338, 139, 339,
        103, 340, 91, 341, 80, 344, 62, 330, 57, 310, 50, 292, 43, 287, 55, 275,
        84, 259, 108, 244, 123, 221, 135, 197, 122, 189, 116, 182, 110, 178,
        104, 168, 87, 157, 64, 152, 50, 151, 39, 144, 42, 124, 50, 99, 60, 98,
        62,
      ],
      closed: true,
      fill: mainBodyColor,
      stroke: "black",
      strokeWidth: borderWidth,
      draggable: true,
    });

    // Left sleeve
    const leftSleeve = new Konva.Line({
      points: leftSleeveVertices || [
        356, 69, 354, 88, 352, 108, 351, 133, 351, 163, 354, 193, 362, 218, 370,
        227, 374, 235, 379, 239, 383, 242, 387, 247, 392, 250, 394, 251, 394,
        256, 395, 262, 395, 266, 394, 268, 380, 261, 368, 250, 352, 226, 342,
        191, 339, 127, 341, 88, 345, 64, 345, 63, 351, 63, 355, 65, 356, 66,
        357, 68, 356, 70,
      ],
      closed: true,
      fill: leftSleeveColor,
      stroke: "black",
      strokeWidth: borderWidth,
      draggable: true,
    });

    // Right sleeve
    const rightSleeve = new Konva.Line({
      points: rightSleeveVertices || [
        85, 67, 87, 92, 89, 111, 91, 149, 89, 174, 85, 203, 80, 215, 69, 232,
        60, 242, 47, 250, 46, 268, 68, 256, 81, 241, 92, 223, 104, 178, 104,
        150, 104, 122, 101, 85, 99, 68, 99, 61, 93, 64, 86, 65, 85, 66,
      ],
      closed: true,
      fill: rightSleeveColor,
      stroke: "black",
      strokeWidth: borderWidth,
      draggable: true,
    });

    layer.add(mainBody, leftSleeve, rightSleeve);
    stage.add(layer);
  }, [
    mainBodyVertices,
    leftSleeveVertices,
    rightSleeveVertices,
    mainBodyColor,
    leftSleeveColor,
    rightSleeveColor,
    borderWidth,
  ]);

  return (
    <div className="max-w-md mx-auto bg-white rounded overflow-hidden shadow-lg p-4">
      <div>
        <label>Main Body Color:</label>
        <input
          type="color"
          value={mainBodyColor}
          onChange={(e) => handleMainBodyColorChange(e.target.value)}
        />
        <input
          type="text"
          value={mainBodyColor}
          onChange={(e) => handleMainBodyColorInputChange(e)}
        />
      </div>
      <div>
        <label>Left Sleeve Color:</label>
        <input
          type="color"
          value={leftSleeveColor}
          onChange={(e) => handleLeftSleeveColorChange(e.target.value)}
        />
        <input
          type="text"
          value={leftSleeveColor}
          onChange={(e) => handleLeftSleeveColorInputChange(e)}
        />
      </div>
      <div>
        <label>Right Sleeve Color:</label>
        <input
          type="color"
          value={rightSleeveColor}
          onChange={(e) => handleRightSleeveColorChange(e.target.value)}
        />
        <input
          type="text"
          value={rightSleeveColor}
          onChange={(e) => handleRightSleeveColorInputChange(e)}
        />
      </div>
      <label htmlFor="border-width">Border Width:</label>
      <input
        type="number"
        id="border-width"
        value={borderWidth}
        onChange={handleBorderWidthChange}
      />
      <div id="stage-container"></div>
    </div>
  );
};

export default CustomTShirt;