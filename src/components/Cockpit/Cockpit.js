import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

// to use useEffect react hook, this functional component name must start with an uppercase letter
//const cockpit = (props) => {
const Cockpit = (props) => {

    // getting an element reference using React Hooks
    const toggleBtnRef = useRef(null);

    // for functional components, use React Hook to get the context
    const authContext = useContext(AuthContext);
    console.log(authContext.authenticated);
    
    // useEffect is the class component lifecycle hook for functional components
    // useEffect is the 2nd most important react hook, useState is the first
    // without a second parameter, it runs for every update and every component creation
    // useEffect(() => {
    //     console.log('[Cockpit.js] useEffect');
    // });

    // if a 2nd parameter is provided, useEffect will be called only if 2nd parameter changes
    // useEffect(() => {
    //     console.log('[Cockpit.js] useEffect');

    //     // fake http request
    //     setTimeout(() => {
    //         alert('saved data to cloud');
    //     }, 1000);
    // }, [props.persons]);

    // if 2nd parameter is an empty array, 
    // useEffect will be called only when the component renders for the first time
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');

        // fake http request
        // const timer = setTimeout(() => {
        //     alert('saved data to cloud');
        // }, 1000);

        toggleBtnRef.current.click();

        // return is optional and it's used to do cleanup
        // it's equivalent to the method componentWillUnmount in class based components
        return () => {
            //clearTimeout(timer);
            console.log('[Cockpit.js] cleanup work in useEffect');
        }

    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');

        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        }

    });
    
    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold);
    }
    
    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button ref={toggleBtnRef} className={btnClass} 
                    onClick={props.clicked}>Toggle Persons</button>
            {/* <AuthContext.Consumer>
                {context => <button onClick={context.login}>Log in</button>}
            </AuthContext.Consumer> */}
            {/* another way to get the context */}
            <button onClick={authContext.login}>Log in</button>
        </div>
    );
};

// export default cockpit;
// export default Cockpit;
// optimization: memo will create a snapshot of this component and only if it changes it will be rendered
// otherwise React will get the existent snapshot that is stored
export default React.memo(Cockpit);