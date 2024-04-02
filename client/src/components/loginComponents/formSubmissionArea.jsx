import { Button, Checkbox, Label, TextInput, Card } from "flowbite-react";

function FormSubmissionArea({handleSubmit, formType}) {
    
    return(
        <Button type= 'submit' onClick={handleSubmit}>{formType}</Button>
    )
}

export default FormSubmissionArea