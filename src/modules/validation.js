const validate = (email, password, passwordConfirm) => {
    // hold email error
    const errors = {};
    if (
        !/\S+@\S+\.\S+/.test(email)
    ) {
        errors.email = `That doesn't look to be a valid email address. Please review and try again.`;
    }
    //hold password Errors
    if (password !== passwordConfirm) {
        errors.password = 'You password do not match. Please review and try again.'
    }
    return errors;
}

export default validate;