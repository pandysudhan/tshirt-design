import Input from "./inputField";

function FormFields({formTypeState, fields , handleChange}) {
  return fields.map((field) => (
    <Input
      key={field.id}
      handleChange={handleChange}
      value={formTypeState[field.id]}
      labelText={field.labelText}
      labelFor={field.labelFor}
      id={field.id}
      name={field.name}
      type={field.type}
      isRequired={field.isRequired}
      placeholder={field.placeholder}
    />
  ));
}
export default FormFields;
