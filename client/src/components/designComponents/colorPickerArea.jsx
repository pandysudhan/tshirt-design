export default function colorPickerArea({ data, onDataChange, currView }) {
  


  function onColorChange(id, new_color) {
    const updatedColors = data.colors.map((color) => {
      if (color.id === id) {
        return { ...color, color_value: new_color };
      }
      return color;
    });

    onDataChange({ ...data, colors: updatedColors });
  }

  function updateImagesForView(img) {
    const updatedViews = data.views.map(view => {
      console.log(view);
      if (view.view_name === currView) {
        const updatedImages = [...view.images, { img_data: img, position: { x: 0, y: 0 } }];
        return { ...view, images: updatedImages };
      }
      return view;
    });

    onDataChange({ ...data, views: updatedViews });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        updateImagesForView(img);
      };
    };

    reader.readAsDataURL(file);
  };


  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        {data.colors.map((color) => (
          <div
            key={"color_picker_div" + color.id}
            className="flex flex-row my-3"
          >
            <label key={"color_picker_label_" + color.id}>
              {color.display_name}
            </label>
            <input
              key={"color_picker_" + color.id}
              type="color"
              value={color.color_value}
              onChange={(e) => {
                onColorChange(color.id, e.target.value);
              }}
            />
            <input
              key={"color_picker_text_" + color.id}
              type="text"
              value={color.color_value}
              onChange={(e) => {
                onColorChange(color.id, e.target.value);
              }}
            />
          </div>
        ))}

        <div id="imgPicker">
          <input type="file" onChange={handleFileChange} />
        </div>
      </div>
    </div>
  );
}
