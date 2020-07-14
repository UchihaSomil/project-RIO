import React,{Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'  //WithRouter is used to manage the prop history
import {Signout,isAuthenticated} from '../Auth/index'
// import { Fragment } from 'react'

const isActive = (history,path) => {
    if(history.location.pathname === path){
        return {color:'#000000'}
    }
    else{
        return {color:'#ffffff'}
    }
}

const Menu = ({history}) =>(
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link " style={isActive( history,'/')} to="/" >Home</Link>
            </li>
           

            {!isAuthenticated() && (   //if first condition is true then it will move to second one
                    //div was messing up with styling hence we have used the fragement here
            <Fragment>                     
            <li className="nav-item">
                <Link className="nav-link" style={isActive( history,'/signup')} to="/signup" >Sign up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive( history,'/signin')} to="/signin" >Sign in</Link>
            </li></Fragment>)}  


                {isAuthenticated && <div><li className="nav-item">
                <span className="nav-link" 
                style={{cursor:'pointer',color:'#ffffff'}} 
                onClick={()=>Signout(()=>{history.push('/')})}   //signup is been imported now,sign up takes an call back fn , so we are passing a fn which will redirect user to the home page.
                  
                   > Log out</span></li></div>}


            
            
        </ul>

    </div>


)

export default withRouter(Menu)
