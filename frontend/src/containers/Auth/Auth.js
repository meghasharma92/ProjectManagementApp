import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

    state = {
        controls: {
            email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email'
				},
				value: '',
				validation: {
                    required: true,
                    isEmail: true
				},
				valid: false,
				touched: false
            },
            password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Your password'
				},
				value: '',
				validation: {
                    required: true,
                    minLength: 6
				},
				valid: false,
				touched: false
			}
        },
        isSignup: true
    }

    checkValidation(value, rules){

		let isValid = true;

		if (rules.required && rules.touched ){
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength){
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength){
			isValid = value.length <= rules.maxLength && isValid
        }
        
        if (rules.isEmail){
            const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
            isValid = pattern.test(value) && isValid
        }
        
        if (rules.isNumeric){
            const npattern = /^\d+$/;
            isValid = npattern.test(value) && isValid
		}

		return isValid;
    }
    
    changeHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedControls = {...this.state.controls};
        const updatedControlElement = {
            ...updatedControls[inputIdentifier]
        };
        updatedControlElement.value = event.target.value;
        updatedControlElement.touched = true;
        updatedControlElement.valid = this.checkValidation(updatedControlElement.value, updatedControlElement.validation);
        updatedControls[inputIdentifier] = updatedControlElement;
        console.log(updatedControlElement);
        let formIsValid = true;
        for(let inputIdentifier in updatedControls){
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid 
        }

        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    submitHandler = (event) => {
        event.preventDefault();
        const formData = {};

		for(let formIdentifier in this.state.orderForm){
			formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
		}

        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        )
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }

    componentDidMount(){
        if (!this.props.building && this.props.authRedirectPath!== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    render(){

        const formElements = [];

		for(let key in this.state.controls){
            console.log(key);
            console.log(this.state.controls[key])
				formElements.push({
					id: key,
					config: this.state.controls[key]
				})			
        }
        
        let formData = formElements.map(formElement => (
                <Input 
                key = {formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig} 
                value = {formElement.config.value}
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
                changed = {(event) => this.changeHandler(event, formElement.id)}
                />	
            ));

            if (this.props.loading) formData = <Spinner />

            let errorMessage = null;
            if (this.props.error) errorMessage = <p>{this.props.error.message}</p>;

            if(this.props.isAuthenticated){
                return (<Redirect to={this.props.authRedirectPath} />)
            }
        
           return(
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {errorMessage}
                    {formData}
                    <Button btnType="success" disabled={!this.state.formIsValid}> SUBMIT </Button>
                </form>
                <Button clicked={this.switchAuthModeHandler}
                btnType="danger" > SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}  </Button>
            </div>
        );
    }

}

const mapStatetoProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchtoProps = dispatch => {
	return{
		onAuth: (email,password, isSignup) => dispatch(actions.authenticate(email,password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
	}
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Auth);