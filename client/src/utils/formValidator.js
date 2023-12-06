const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validate = (rules, field, value) => {
    
    const rule = rules[field];
    let error = null;

    if (rule) {
        if (
            (rule.minLength && value.length < rule.minLength) ||
            (rule.minDate && value < rule.minDate) ||
            (rule.minValue !== null && rule.minValue !== undefined && +value < +rule.minValue) ||
            (rule.type === 'url' && value.length > 0 && !urlRegex.test(value)) ||
            (rule.type === 'email' && !emailRegex.test(value)) ||
            (rule.type === 'number' && !Number.isInteger(+value))
        ) {
            error = rule.message;
        }
    }

    return error;
}



export const validateMany = (rules, values) => {
    const newErrors = {};
    
    Object.entries(rules).forEach(([field, rule]) => {
        const value = values[field];

        if (
            (rule.minLength && value.length < rule.minLength) ||
            (rule.minDate && value < rule.minDate) ||
            (rule.minValue !== null && rule.minValue !== undefined && value < rule.minValue) ||
            (rule.type === 'url' && value.length > 0 && !urlRegex.test(value)) ||
            (rule.type === 'email' && !emailRegex.test(value)) ||
            (rule.type === 'confirm-pass' && value !== values['password']) ||
            (rule.type === 'number' && !Number.isInteger(+value)) 
        ) {
            newErrors[field] = rule.message;
        }
    });

    return newErrors;
    
}