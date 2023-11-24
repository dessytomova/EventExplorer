import { useState } from "react";

export default function useForm(submitHandler, initialValues) {

    const [values, setValues] = useState(initialValues);

    const onChange = (e) => {
        let value = '';
        let name = e.target.name;

        switch (e.target.type) {
            case 'number': value = Number(e.target.value);
                break;
            case 'checkbox': value = e.target.checked;
                break;
            default: value = e.target.value;
                break;
        }

        setValues(state => ({ ...state, [name]: value }));

    }

    const onSubmit = (e) => {
        e.preventDefault();

        submitHandler(values);

        onReset();
    }

    const onReset = () => {
        setValues(initialValues);
    }

    return {
        values,
        onChange,
        onReset,
        onSubmit
    }
}