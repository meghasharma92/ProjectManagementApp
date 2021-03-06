import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {

		state = {
			error: null
		}

		componentWillMount(){
			this.reqInterceptors = axios.interceptors.request.use(req => {
				this.setState({error: null});
				return req;
			});
			this.resInterceptors = axios.interceptors.response.use(res => res, error => {
				this.setState({error: error});
			});
		}

		componentWillUnmount(){
			axios.interceptors.request.eject(this.reqInterceptors);
			axios.interceptors.request.eject(this.resInterceptors);
		}

		cancelErrorHandler = () => {
			console.log('coming in cancelErrorHandler');
			this.setState({error: null});
		}

		render(){
			console.log('WrappedComponent');
		return(
			<Aux>
				<Modal 
				show={this.state.error} 
				modalClosed={this.cancelErrorHandler} >
					{this.state.error ? this.state.error.message : null}
				</Modal>
				<WrappedComponent {...this.props}/>
			</Aux>
			) ;
		}
	}

}

export default withErrorHandler;