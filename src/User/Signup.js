import React, { useState } from 'react'
import Layout from '../core/Layout'
import {signup} from '../Auth'

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    }
    )

    const handleChange = name => event => {   //This is the way how higher order functions are made,here basically we are just,taking name as arguement to a fn which would lead to another fn with event as arguement,where it have Setstate method.
        setValues({ ...values, error: false, [name]: event.target.value });  //Here using [name] we are accessing name ,email, password as we passed it as arguement

    }

    const { name, email, password, error, success } = values    //object destructing in order to get access of the key value pairs of an object.(also  we would have required circular brackets outside the whole expression if it had not been inside an fn)


    



    const clickSubmit = event => {
        event.preventDefault();         //According to default nature of the browser,browser will reload the page.
        setValues({...values,error:false})                            
          let data =  signup({ name, email, password })
        .then(data => {     // basically it is equivalent to  name:name,email:email,password:password ,bcz key value pair have the same value,also this is recieving as a object 'user' in sign up fn
            //why did they use data.error? is error is an predefined keyword in react or we made backend in such a way so we have defined error word there itself
            if (data.error) {             //so that we can display any error
                setValues({ ...values, error: data.error, success: false })
            }
            else {  //need to clear out the value of the fields if sign up is succesful.
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true,

                })

            }
        })

    }



    const signUpForm = () => (
        <form>
            <h3>Register</h3>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')}
                    type="text"
                    className="form-control"
                    value={name}>

                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}></input>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Sign up</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created.
        </div>
    )


    return (
        <Layout title="Sign up"
            description="Sign up to react node e commerce"
            className="container col-md-8 offset-md-2"
        >
            {showError()}
            {showSuccess()}
            {/* {process.env.REACT_APP_API_URL} */}
            {signUpForm()}
            {JSON.stringify(values)}
        </Layout>)
}


export default Signup