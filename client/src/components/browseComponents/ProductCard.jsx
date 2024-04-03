import React, { useEffect, useRef } from "react";
import Konva from "konva";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({ data }) {
  const navigate = useNavigate();

  const currView = "Front View";
  const layerRef = useRef(null);
  const stageRef = useRef(null);
  const colorData = data.colors;

  const height = 300;
  const width = 220;
  const currViewData = data.views.find((view) => view.view_name === currView);

  const drawImageOnCanvas = (idx, img, widthScale, heightScale) => {
    const layer = layerRef.current;

    const width = img.size ? img.size.width * widthScale : 80 * widthScale;
    const height = img.size ? img.size.height * heightScale : 80 * heightScale;

    const imageObj = new window.Image();

    // Set the src attribute to the Base64 string
    imageObj.src = img.img_data;

    const konvaImage = new Konva.Image({
      image: imageObj,
      width: width,
      height: height,
      x: img.position.x * widthScale,
      y: img.position.y * heightScale,
      draggable: true,
    });

    layer.add(konvaImage);
  };

  useEffect(() => {
    const stageContainerId = `stage-container-${data.id}`; // Generate unique container ID

    const stage = new Konva.Stage({
      container: stageContainerId,
      width: width,
      height: height,
      fill: "transparent",
    });
    stageRef.current = stage;

    const layer = new Konva.Layer();
    layerRef.current = layer;

    // Calculate scaling factors
    const widthScale = width / 437; // New width / Original width
    const heightScale = height / 622; // New height / Original height

    for (const productPart of currViewData.parts) {
      const fill_color = colorData.find(
        (item) => item.id === productPart.color
      );

      // Scale coordinates
      const scaledCoordinates = productPart.coordinates.map((coord, index) => {
        if (index % 2 === 0) {
          // X-coordinate
          return coord * widthScale;
        } else {
          // Y-coordinate
          return coord * heightScale;
        }
      });

      const tempPart = new Konva.Line({
        points: scaledCoordinates,
        closed: true,
        fill: fill_color.color_value,
        stroke: "black",
        strokeWidth: 1.5,
        draggable: false,
      });
      layer.add(tempPart);
    }

    const currViewData_ = data.views.find(
      (view) => view.view_name === currView
    );
    const currViewImages_ = currViewData_.images || [];

    for (const [idx, img] of currViewImages_.entries()) {
      drawImageOnCanvas(idx, img, widthScale, heightScale);
    }

    stage.add(layer);

    return () => {
      layer.destroy();
      stage.destroy();
    };
  }, [data, currView]);

  const handleProductClick = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      // Access token not found, redirect to login page
      navigate("/login");
      return;
    }

    // Access token found, navigate to the design page
    navigate("/design", { state: { data: data } });
  };

  const handleDeleteProduct = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Access token not found, redirect to login page
        navigate("/login");
        return;
      }

      // Access token found, make delete request using Fetch
      const response = await fetch(`YOUR_API_ENDPOINT/${data.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Check if request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle success response
      const data = await response.json();
       // Log success message or do something else
    } catch (error) {
      // Handle error
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col align-center">
      <div onClick={handleProductClick} style={{ position: "relative" }}>
        <div id={`stage-container-${data.id}`} />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.7)",
            padding: "5px",
          }}
        >
          {data.product_name}
        </div>
        <div style={{ position: "absolute", top: "5px", right: "5px" }}></div>
      </div>
    </div>
  );
}
