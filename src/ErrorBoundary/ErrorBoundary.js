// import { Component } from 'react';
const { Component } = require("react");

class ErrorBoundary extends Component {
    
    state = {
        hasError: false,
        errorMessage: ''
    }

    // method provided by React
    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errorMessage: error.toString()});
    }
    
    render() {
        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>
        } else {
            return this.props.children;
        }

    } 
}

export default ErrorBoundary;