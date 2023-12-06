import { useState } from "react";
import {validate, validateMany} from "../utils/formValidator";

export default function useForm(submitHandler, initialValues, validationRules = {}) {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

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
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }

    const onBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const validateField = (field, value) => {
        let error = null;
        error = validate(validationRules, field, value);

        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };



    const validateForm = () => {
        const newErrors = validateMany(validationRules, values);

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const onSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            submitHandler(values);
        }
    }

    const onReset = () => {
        setValues(initialValues);
        setErrors({});
    }

    return {
        values,
        onChange,
        onReset,
        onSubmit,
        onBlur,
        errors
    }
}