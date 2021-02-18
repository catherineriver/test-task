import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import validate from '../../modules/validation';
import { Link } from 'react-router-dom';
import './Forgot.css';


const Forgot = props => {
    const apiUrl = '/forgot';

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState('')
    const [{
        isLoading
    }, doFetch] = useFetch(apiUrl);


    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(email);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            doFetch({
                method: 'post',
                data: {
                    user: {
                        email: email,
                    }
                }
            })
        }
    }

    return (<div className="container">
        <div className="logo">
            <img src="/images/logo.png" alt="logo" />
        </div>
        <div className="form-wrapper">
            <h2>Forgot your password?</h2>
            <p>Please enter your email address below and allow for a few minutes to recieve the password</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-item">
                    <label>Email</label>
                    <input name="email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    {errors.email && (
                        <div className="form-error" >{errors.email}</div>)} </div>
                <button className="btn btn--action" type="submit" disabled={isLoading}>Send</button>
            </form>
            <div className="links" >
                <Link to='/login'>Sign In </Link>
                <span> or </span>
                <Link to='/register'>Register </Link>
            </div>
        </div>
    </div>
    )
}

export default Forgot;