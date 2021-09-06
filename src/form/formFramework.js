export function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

export function validate(value, validation) {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '';
    }

    return isValid;
}

export function validateForm(formControls) {
    let isFormValid = true;

    Object.keys(formControls).forEach(controlName => {
        const control = formControls[controlName];
        isFormValid = control.valid && isFormValid
    });

    return isFormValid
}

// export async function create(url, data) {
//     return await axios.post(url, data)
// }