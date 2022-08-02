import axios from 'axios';
import Joi from 'joi'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  //New user object
  const [user, setUser] = useState({
    "first_name": "",
    "last_name": "",
    "email": "",
    "age": 0,
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
  //Initializa Joi validation over registeration form
  function initJoiValidation() {
    //Set the rules (schema)
    const rule = Joi.object().keys({
      "first_name": Joi.string().min(2).max(15).required(),
      "last_name": Joi.string().alphanum().min(2).max(15).required(),
      "email": Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      "age": Joi.number().integer().min(18),
      "password": Joi.string().pattern(new RegExp('/^[a-z]/')).required()
    });
    //Validate rules
    const { error, value } = rule.validate({
      "first_name": "Requried with length (2-15)",
      "last_name": "Requried with length (2-15)",
      "email": "email is requried",
      "age": "age must integer number",
      "password": "password must start with lower case charecters"
    }, { abortEarly: false });
    //Set joi validation variable if there's errors
    setJoiResponse({ error, value });

    if(error.details.length === 0){
      return false;
    }
   else
   {
    return true;
   }
  }

  //Api response message
  let [apiMsg,setApiMsg]=useState("");

  //flag for api if loading or finished
  let [awaitFlag,setAwaitFlag]=useState(false);
//Initialize use navigate hook
let navigator=useNavigate();
  //Handel registeration form submittion
  async function submitUser(event) {
    //prevent page refresh on form submittion
    event.preventDefault();

    //Call joi validation initializer
    let isValid=initJoiValidation();
   
    //Posting data to api using Axios
    if (isValid) {
       //Set flag for api to loading
    setAwaitFlag(true);
      let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signUp', user);
      setApiMsg(data.message);
      setAwaitFlag(false);
     // document.querySelector("#registrationFormContainer").insertAdjacentHTML("afterbegin",`<div className='position-absolute top-50 start-50 bg-success'><span className='fw-bold'>${apiMsg}</span></div>`);
      if (data.message === 'success') {
        navigator('/login');
      }
      else {
        
      }
    }
    else {
      console.log("Data is not valid");
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
      <div id="registrationFormContainer" className='container position-relative'>
      {apiMsg?<div className={apiMsg==='success'?'position-absolute top-20 start-0 py-2 bg-success':'position-absolute py-2 top-0 start-0 bg-danger'}><span className='p-5 fw-bold'>{apiMsg}</span></div>:""}
        <form onSubmit={(evt) => { submitUser(evt) }}>
          <div className="row d-flex align-items-center">
            <div className="col-lg-6 col-md-8 col-sm-12">
              <div className="row">
                <div className="col-12">
                  <h2 className='my-3'>Sign up here ...</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="firstName">First name</label>
                  <input type='text' id='txtFirstName' name='first_name' onBlur={(evt) => { addUser(evt) }} className='form-control my-3' placeholder='ex: Mart'></input>
                  {joiResponse.error.details.filter((detail) => { return detail.context.key === 'first_name' }).length !== 0 ? <span className='invalid-feedback d-block'>{joiResponse.value.first_name}</span> : ''}
                </div>
                {console.log("joi ,",joiResponse)}
                <div className="col-6 form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input type='text' id='txtLastName' name="last_name" onBlur={(evt) => { addUser(evt) }} className='form-control my-3' placeholder='ex: Sherodenger'></input>
                  {joiResponse.error.details.filter((detail) => { return detail.context.key === 'last_name' }).length !== 0 ? <span className='invalid-feedback d-block'>{joiResponse.value.last_name}</span> : ''}
                </div>
              </div>
              <div className="row">
                <div className="col-12 form-group">
                  <label htmlFor="age">Age</label>
                  <input type='number' id='txtAge' name="age" onBlur={(evt) => { addUser(evt) }} className='form-control my-3' placeholder='between 10-30'></input>
                  {joiResponse.error.details.filter((detail) => { return detail.context.key === 'age' }).length !== 0 ? <span className='invalid-feedback d-block'>{joiResponse.value.age}</span> : ''}
                </div>
              </div>
              <div className="row">
                <div className="col-12 form-group">
                  <label htmlFor="email">Email</label>
                  <input type='email' id='txtEmail' name="email" onBlur={(evt) => { addUser(evt) }} className='form-control my-3' placeholder='martsherodenger@anyDomain.com'></input>
                  {joiResponse.error.details.filter((detail) => { return detail.context.key === 'email' }).length !== 0 ? <span className='invalid-feedback d-block'>{joiResponse.value.email}</span> : ''}
                </div>
              </div>
              <div className="row">
                <div className="col-12 form-group">
                  <label htmlFor="password">Password</label>
                  <input type='password' id='txtPassword' name='password' onBlur={(evt) => { addUser(evt) }} className='form-control my-3' placeholder='alphabets and digits'></input>
                  {joiResponse.error.details.filter((detail) => { return detail.context.key === 'password' }).length !== 0 ? <span className='invalid-feedback d-block'>{joiResponse.value.password}</span> : ''}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button className='btn btn-info my-3'>{awaitFlag?<i className='fa-solid fa-spinner fa-spin'></i>:'Sign up'}</button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-12">
              <div className="p-5 my-3">
                <h5 className='my-3'>Wellcome to Fragny.</h5>
                <p className='my-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, rem quae accusantium ullam ratione facilis necessitatibus.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}
