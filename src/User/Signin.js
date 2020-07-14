import React, { useState } from 'react'
import Layout from '../core/Layout'
// import {signup} from '../Auth'
import { signin, Authenticate } from '../Auth'
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import {Link,Redirect} from 'react-router-dom'


const Signin = () => {

    const [values, setValues] = useState({

        email: '',
        password: '',
        error: '',
        loading: false,
        reDirectToReferrer: false    //when we successfully sign in we will set this to true
    }
    )

    const handleChange = name => event => {   //This is the way how higher order functions are made,here basically we are just,taking name as arguement to a fn which would lead to another fn with event as arguement,where it have Setstate method.
        setValues({ ...values, error: false, [name]: event.target.value });  //Here using [name] we are accessing name ,email, password as we passed it as arguement

    }

    const { email, password, error, loading, reDirectToReferrer } = values    //object destructing in order to get access of the key value pairs of an object.(also  we would have required circular brackets outside the whole expression if it had not been inside an fn)






    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })        //we will show loading if its loading however if somne error occurs and when if its success then we will change loading back to eroor                     
        signin({ email, password }).then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error, loading: false })
            }
            else {  //need to clear out the value of the fields if sign up is succesful.
                Authenticate(data, ()=>{
                    setValues({
                        ...values,
    
                        // email: '',
                        // password: '',
                        // error: '',               //bcz if its successful then we dont need to think about erasing filled data we just need to move him to another page
                        // loading: false,
                        redirectToReferrer: true
                } )

                })

            }
        })

    }



    const signUpForm = () => (
        <form>
            <h3>Login</h3>

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
    );
    const showLoading = () =>                    //look at this very very carefullu dude!!!!
        loading && (
            <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
                <h2>Loading</h2>
            </div>
        );


        const redirectUser = () => {
            if(reDirectToReferrer){
                return <Redirect to="/" />
            }
        }


    return (
        <Layout title="Sign up"
            description="Sign up to react node e commerce"
            className="container col-md-8 offset-md-2"
        >
            {showError()}
            {showLoading()}
            {/* {process.env.REACT_APP_API_URL} */}
            {signUpForm()}
            {/* {JSON.stringify(values)} */}
            {redirectUser()}
        </Layout>)
}


export default Signin