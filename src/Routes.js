import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Signin from './User/Signin'
import Signup from './User/Signup'
import Home from './core/Home'
import Menu from './core/Menu'


const Routes = () => {
    return(
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/signin' exact component={Signin}/>
                <Route path='/signup' exact component={Signup}/>
                {/* <Route path='/signup' exact component={Signup}/> */}
                <Route  />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;