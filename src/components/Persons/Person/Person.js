// import './Person.css';
import React, { Component, Fragment } from 'react';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import classes from './Person.module.css';

// Typechecking With PropTypes
// to install prop-types: npm install --save prop-types
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

// import Radium from 'radium'; 
// import styled from 'styled-components';
// style-components syntax style with backticks: styled.doSomething``
// this a regular JavaScript feature called tagged template
// doSomething is a method and the backticks are the parenthesis

// const person = (props) => {
//     return <p>I'm a {props.name} and I'm {props.age} years old!</p>
// };

// const person = props => <p>I'm a {props.name} and I'm {props.age} years old!</p>;

// react styled component provided by styled-components library
// const StyledDiv = styled.div`
//     width: 60%;
//     margin: auto;
//     border: 1px solid #eee;
//     box-shadow: 0 2px 3px #ccc;
//     padding: 16px;
//     text-align: center;

//     @media (min-width: 500px) {
//         width: 450px;
//     }
//     `;

// const person = (props) => {
class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    // another way to access context in class-based components
    // for example, it can be accessed in method componentDidMount
    // by using this.context
    static contextType = AuthContext;
    
    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log('[Person.js] rendering...');

        // return (
        // return [ // now returning an array using [], so we don't need the div wrapper anymore    
            // <div className="Person" style={style}>
            // <StyledDiv>
            // need a div to wrap all the child elements, unless it's an array of elements
            // <div className={classes.Person}>
                // if returning an array, need to put a comma after each element and add a key
                // <p key="i1" onClick={this.props.click}>I'm a {this.props.name} and I'm {this.props.age} years old!</p>,
                // <p key="i2">{this.props.children}</p>,
                // <input key="i3" type="text" onChange={this.props.changed} value={this.props.name} />
            // </div>
            // </StyledDiv>
            // </div>
        // )
        // ];

        return (
            // using Aux instead of a regular div to wrap the child elements
            // <Aux> 
            // Fragment is a built-in React feature, it acts in the same as the Aux component we created
            <Fragment> 
                {/* <AuthContext.Consumer>
                    {context => 
                            context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
                </AuthContext.Consumer> */}
                {/* another way to access context */}
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
                <p onClick={this.props.click}>I'm a {this.props.name} and I'm {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input 
                        type="text" 
                        // the ref keyword is reference to the element
                        // this way we get a reference using the method componentDidMount
                        // ref={(inputEl) => {this.inputElement = inputEl}}

                        // this way we get a reference using the constructor, this is the modern approach
                        ref={this.inputElementRef}
                        onChange={this.props.changed} 
                        value={this.props.name} />
            </Fragment>
            // </Aux>
            
        );
    }

    // console.log('[Person.js] rendering...');

    // const style = {
    //     '@media (min-width: 500px)': {
    //         width: '450px'
    //     }
    // };

    // randomly throwing an error for error boundary
    // const rnd = Math.random();
    // if (rnd > 0.7) {
    //     throw new Error('Something went wrong')
    // }

    // return (
    //     // <div className="Person" style={style}>
    //     // <StyledDiv>
    //     <div className={classes.Person}>
    //         <p onClick={props.click}>I'm a {props.name} and I'm {props.age} years old!</p>
    //         <p>{props.children}</p>
    //         <input type="text" onChange={props.changed} value={props.name} />
    //     </div>
    //     // </StyledDiv>
    //     // </div>
    // )
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    change: PropTypes.func
};

// export default Radium(person);
// export default person;
export default withClass(Person, classes.Person);