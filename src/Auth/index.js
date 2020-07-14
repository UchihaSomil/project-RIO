
import {API} from '../config'

export const signup = user => { 
//here we are basically taking 'user' as the arguement to this fn
    let promise = fetch(`${API}/signUp`, {                           //defininf the URL address where we will be sending request
            method: "POST",                                       //defining the method
            headers: {
                Accept: 'applications/json',                        //this is the format we will recieve in  response once our request is successful
                "content-type": "applications/json"                   //this is the kind of the content we will be sending along with our request.
            },
            body: JSON.stringify(user) //it consists of the content we are going to send with our request and here we are converting object in json file
        })
        
       return promise.then(successCallback).catch(errorCallback)

        function successCallback(data) {
                return data.json()
        }
        function errorCallback(err) {
            console.log(err)
        }

        


        
       
        
    }

    export const signin = user => {                                      //here we are basically taking 'user' as the arguement to this fn

        return fetch(`${API}/SignIn`, {                           //defininf the URL address where we will be sending request
            method: "POST",                                       //defining the method
            headers: {
                Accept: 'applications/json',                        //this is the format we will recieve in  response once our request is successful
                "content-type": "applications/json"                   //this is the kind of the content we will be sending along with our request.
            },
            body: JSON.stringify(user) //it consists of the content we are going to send with our request and here we are converting object in json file
        })


            .then(response => {               //if there will be no error then it will move here and we will recieve our response
                return response.json();
            })

            .catch(err => {                     //if there will be an error during request then it will move here
                console.log(err)

            })

    }








    export const Authenticate = (data,next) =>   //data and a call back fn   //this is basically used in order to save token in local storage 
    {
        if(typeof window !== 'undefined'){     //bcz local storage is the property of window object
            localStorage.setItem("jwt",JSON.stringify(data));    //name of it,what is it you want to save
            next()  ;  //in this call back we can redirect user to some other page
        }
    }



    export const Signout = (next) => {    //this fn will take a call back which can be used to update state or redirect the user
        if(typeof window !== 'undefined'){  //first we will check for the existene of the user' local storage
            localStorage.removeItem("jwt")   //as user logouts then we have to remove token fron storage
            next();   // again the call back ,abbe ab to pata hoga na kiske k liye use hota hai

            return fetch(`${API}/signOut`,{
                method:"GET",     //we are just asking backend to logout so you can use GET request here
            })
            .then(response=> {
                console.log('signout',response)
            })
            .catch(err => console.log(err))
        }}





    export const isAuthenticated = () => {  //In order to hide links basis of user is logged in or not that is by local storage

        if (typeof window == 'undefined'){
            return false
        } 
        if(localStorage.getItem('jwt')){                       //move foeward if we have the jwt object
            return JSON.parse(localStorage.getItem('jwt'))     // bcz here we want to retreive data in json format (jwt will have token as well as information)
        }else {return false}

    }    