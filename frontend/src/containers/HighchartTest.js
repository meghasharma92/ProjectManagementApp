import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import  ReactDOM  from 'react-dom';
import  ReactHighcharts  from 'react-highcharts';

class HighChartTest extends Component {

    state = {
        config: {
            chart: {
                renderTo: 'container',
                type: 'bar'
            },
            series: [{
                name: 'Jane',
                data: [1, 0, 4]
            }]
        }
    }

	componentDidMount(){
        // let chart = this.refs.chart.getChart();
        // chart.series[0].addPoint({x: 10, y: 12});
	}
	render(){
        return (<ReactHighcharts config= {this.state.config} ref="chart"></ReactHighcharts>);
	}

}

const mapStatetoProps = state => {
		return {
			isAuthenticated: state.auth.token !== null
		}
}

const mapDispatchtoProps = dispatch => {
	return{
	}
}
	
export default connect(mapStatetoProps,mapDispatchtoProps)(HighChartTest);