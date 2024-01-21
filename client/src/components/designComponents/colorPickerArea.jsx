export default function colorPickerArea({ data, onDataChange }) {
  function onColorChange(id, new_color) {
    const updatedColors = data.colors.map((color) => {
      if (color.id === id) {
        return { ...color, color_value: new_color };
      }
      return color;
    });

    onDataChange({ ...data, colors: updatedColors });
  }
  return (
    <div className="flex flex-col">
      {data.colors.map((color) => (
        <div key={"color_picker_div" + color.id} className="flex flex-row my-3">
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
    </div>
  );
}
