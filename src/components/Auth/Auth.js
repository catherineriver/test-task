
import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import './Auth.css';


const Auth = props => {
    const isLogin = props.match.path === '/login';
    const pageTitle = isLogin ? 'Sign In' : 'Register your account';
    const descLink = isLogin ? '/register' : '/login';
    const descButton = isLogin ? 'Register now' : 'Sign In';
    const apiUrl = isLogin ? '/sign-in' : '/register';

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errors, setErrors] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);
    const [{isLoading}, doFetch] = useFetch({apiUrl});

    console.log(passwordConfirm)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(email, password, passwordConfirm);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            doFetch({
                method: 'post',
                data: {
                    user: {
                        email: email,
                        password: password
                    }
                }
            })
        }
    }

    const validate = (email, password, passwordConfirm) => {
        // hold email error
       const errors = {};
       if (
           !/\S+@\S+\.\S+/.test(email)
       ) {
           errors.email = `That doesn't look to be a valid email address. Please review and try again.`;
       }
       //hold password Errors
       if(password !== passwordConfirm){
           errors.password = 'You password do not match. Please review and try again.'
       }
       return errors;
     }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const togglePasswordConfirmVisiblity = () => {
        setPasswordConfirmShown(passwordConfirmShown ? false : true);
    };

    return(
    <div className="container">
        <div className="logo">
            <img src="/images/logo.png" alt="logo"/>
        </div>
        <div className="form-wrapper">
            <h2>{pageTitle}</h2> 
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-item">
                    <label>Email</label>
                    <input name="email" type="text" value={email} onChange={e=> setEmail(e.target.value)} />
                    {errors.email &&( <div className="form-error">{errors.email}</div>)}
                </div>

                <div className="form-item">
                    <label>Password</label>
                    <input type={passwordShown ? "text" : "password"} 
                        value={password} 
                        onChange={e=> setPassword(e.target.value)}/>
                    {password && (
                        <div className="show-btn" onClick={togglePasswordVisiblity}>
                            {passwordShown ? 'hide' : 'show'}
                        </div>)}
                </div>
                {isLogin &&(
                    <div className="form-footer">
                        <label className="form-checkbox">
                            <input type="checkbox"></input>
                            Keep me signed in
                            <span className="checkmark"></span>
                        </label>
                        <Link className="link" to='/forgot'>Forgot your password?</Link>
                    </div>
                )}


                {!isLogin &&(
                    <div className="form-item">
                        <label>Re-type password</label>
                        <input type={passwordConfirmShown ? "text" : "password"} 
                            value={passwordConfirm} 
                            onChange={e=> setPasswordConfirm(e.target.value)}
                        />
                        {errors.password &&( <div className="form-error">{errors.password}</div>)}
                        {passwordConfirm && (
                            <div className="show-btn" onClick={togglePasswordConfirmVisiblity}>
                                {passwordConfirmShown ? 'hide' : 'show'}
                            </div>)}
                    </div>
                )}

                <button className="btn btn--action" type="submit" disabled={isLoading}>{pageTitle}</button>
            </form>
            <Link to={descLink}>
                <button className="btn">{descButton}</button>
            </Link>
        </div>
    </div>
    )}

export default Auth;