import { useState } from "react";

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
        const rule = validationRules[field];
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        let error = null;

        if (rule) {
            if (
                (rule.minLength && value.length < rule.minLength) ||
                (rule.minDate && value < rule.minDate) ||
                (rule.minValue !== null && rule.minValue !== undefined && +value < +rule.minValue) ||
                (rule.type === 'url' && value.length > 0 && !urlRegex.test(value)) ||
                (rule.type === 'number' && !Number.isInteger(+value))
            ) {
                error = rule.message;
            }
        }


        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };



    const validateForm = () => {
        const newErrors = {};
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        Object.entries(validationRules).forEach(([field, rule]) => {
            const value = values[field];

            if (
                (rule.minLength && value.length < rule.minLength) ||
                (rule.minDate && value < rule.minDate) ||
                (rule.minValue !== null && rule.minValue !== undefined && value < rule.minValue) ||
                (rule.type === 'url' && value.length > 0 && !urlRegex.test(value)) ||
                (rule.type === 'number' && !Number.isInteger(+value))
            ) {
                newErrors[field] = rule.message;
            }
        });

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