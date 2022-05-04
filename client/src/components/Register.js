import React from 'react';
import Joi from 'joi-browser'
import Form from '../common/Form';
import auth from '../services/authService';
import * as userService from '../services/registrationService';

class RegisterForm extends Form {
    
    state = {
        data :{username:'',password:'',name:'', role:''},
        errors:{}
    }

    schema ={
        username : Joi.string()
            .required()
            .label("Username"),
        password : Joi.string()
            .required()
            .min(8)
            .label("Password"),
        name : Joi.string()
            .required()
            .min(5)
            .label("Name"),
        role: Joi.string()
            .required()
            .min(2)
            .label("Role")    
    }

    doSubmit=async()=>{
        try{
            const response = await userService.register(this.state.data)
            console.log(response)
            auth.loginWithJwt(response.headers['x-auth-token'])
            window.location='/'
        }catch(ex){
            if (ex.response && ex.response.status === 400){
                const errors = {...this.state.errors}
                errors.username = ex.response.data;
                this.setState({errors})
            }
        }
        
    }
    
    customValidation = (input) => {
    }

    render() { 

        return (
        <div>
            <h1>Register</h1> 
            <form onSubmit={this.handleSubmit}>
            {this.renderInput("username","Username")}
            {this.renderInput("password","Password","password")}
            {this.renderInput("name","Name")}
            <select>
                {/* <option value="role">Role </option> */}
                <option value="USER">USER</option>
                <option value="MANAGER">MANAGER</option>
            </select>
            {this.renderButton("Register")} 
            </form>
        </div> );
    }
}
 
export default RegisterForm;