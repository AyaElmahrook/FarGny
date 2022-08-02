import axios from 'axios';
import Joi from 'joi'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
   //New user object
   const [user, setUser] = useState({
    "email": "",
    "password": ""
  });
  //Collect user object data from inputs
  function addUser(evt) {
    let newUser = { ...user };
    newUser[evt.target.name] = evt.target.value;
    setUser(newUser);
  }
   //Joi validation return object
   let [joiResponse, setJoiResponse] = useState({
    error: { details: [] },
     value: "" 
   });

 //Initializa Joi validation over login form
 function initJoiValidation() {
   //Set the rules (schema)
   const rule = Joi.object().keys({
     "email": Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
     "password": Joi.string().pattern(new RegExp('/^[a-z]/')).required()
   });

   //Validate rules
   const { error, value } = rule.validate({
     "email": "email is requried",
     "password": "password must start with lower case charecters"
   }, { abortEarly: false });

   //Set joi validation variable if there's errors
   setJoiResponse({ error, value });
   if(error.details.length === 0)return false;
  else return true;
 }

 //Api response message
 let [apiMsg,setApiMsg]=useState("");

 //flag for api if loading or finished
 let [awaitFlag,setAwaitFlag]=useState(false);

//Initialize use navigate hook
let navigator=useNavigate();

//Handel login form submittion
async function submitUser(event) {
  //prevent page refresh on form submittion
  event.preventDefault();

  //Call joi validation initializer
  let isValid=initJoiValidation();
 
  //Posting data to api using Axios
  if (isValid) {
     //Set flag for api to loading
    setAwaitFlag(true);
    let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signIn', user);
    setApiMsg(data.message);
    setAwaitFlag(false);
    if (data.message === 'success') {
      localStorage.setItem("token",data.token);
      props.getToken();
      navigator('/home');    
    }
  }
}
//Check if an object properties are empty
 function isEmpty(object) {
  for (const property in object) {
    if(property === "")
    return true;
  }
  return false;
}
//works as component did update
  useEffect(() => {
    if(isEmpty(user)){
      console.log(user);
    }
    if(joiResponse.error.details.length !== 0){
      setJoiResponse(joiResponse);
      console.log(joiResponse);
    }
  }, [user,joiResponse])


  return (
    <React.Fragment>
    <div className='container position-relative'>
    {apiMsg?<div className={apiMsg==='success'?'position-absolute top-20 start-0 bg-success py-2':'position-absolute top-0 start-0 bg-danger py-2'}><span className='p-3 fw-bold'>{apiMsg}</span></div>:""}
      <form onSubmit={(evt) => { submitUser(evt) }}>
        <div className="row d-flex align-items-center">
          <div className="col-lg-6 col-md-8 col-sm-12">
            <div className="row">
              <div className="col-12">
                <h2 className='my-3'>Login here ...</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12 form-group">
                <label htmlFor="email">Email</label>
                <input type='email' id='txtEmail' name="email" onChange={(evt) => { addUser(evt) }} className='form-control my-3' placeholder='martsherodenger@anyDomain.com'></input>
              </div>
            </div>
            <div className="row">
              <div className="col-12 form-group">
                <label htmlFor="password">Password</label>
                <input type='password' id='txtPassword' name='password' onChange={(evt) => { addUser(evt) }} className='form-control my-3' placeholder='alphabets and digits'></input>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button className='btn btn-info my-3'>{awaitFlag?<i className='fa-solid fa-spinner fa-spin'></i>:'Sign in'}</button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-4 col-sm-12">
            <div className="p-5 my-3">
              <h5 className='my-3'>You're now a member at Fragny.</h5>
              <p className='my-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, rem quae accusantium ullam ratione facilis necessitatibus.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </React.Fragment>
  )
}
