import { Component, useState } from 'react';
// import './App.css'; // need to include the .css extension
import classes from './App.module.css'; // add the extension .module.css to use CSS modules
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Person from '../components/Persons/Person/Person'; // don't need to include the .js extension, React will assume it's a js file
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';
// import styled from 'styled-components';
import AuthContext from '../context/auth-context';

// this is a third-party package to allow CSS pseudo selectors and media query in JavaScript
// from the project folder, run: npm install --save radium
// need to call it from the export at the last code line
// to use CSS media query, need to import StyleRoot
// import Radium, { StyleRoot } from 'radium'; 

// if a component uses state property or useState react hook, it's called stateful component
// otherwise it's called stateless component
// stateful component a.k.a. smart or container component
// stateless component a.k.a. presentational or dumb component

/*
// Function Based Component
// functional componentes cannot use Lifecycle Hooks
// has access to props via method argument
// has access to state via useState react hook
const App = props => {

  // useState is the most common react hook
  const [personsState, setPersonsState] = useState(
    {
      persons: [
        {name: 'Marco', age: 41},
        {name: 'Marcelo', age: 35},
        {name: 'João', age: 20}
      ],
      // Differently from class based components, using react hooks make otherState 
      // will be overriden when switchNameHandler is called and will disapear
      otherState: 'some other value'
    }
  );

  console.log(personsState);
  
  // this a function inside of another function, perfectly fine in JavaScript
  const switchNameHandler = () => {
    setPersonsState(
      {
        persons: [
          {name: 'Marco Yuri', age: 41},
          {name: 'Marcelo', age: 35},
          {name: 'João', age: 300}
        ]
      }
    );

    console.log(personsState);
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React app</h1>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>
        Hobbies: Biking
      </Person>
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
    </div>
  );
}
*/

// const StyledButton = styled.button`
//   background-color: ${props => props.alt ? 'red' : 'green'};
//   color: white;
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;
//   &:hover {
//     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
//     color: black;
//   }
// `;

// Class-Based Component
// only class-based components can use Lifecycle Hooks
// 'Lifecycle Hooks' has nothing to do with 'React Hooks'
// has access to props and state via this keyword
class App extends Component {

  // #1 lifecycle hook (component creation) to be called
  constructor(props) {
    // need to call supper(props) so that props get initialized on the parent class Component 
    super(props); 
    console.log('[App.js] constructor');
  }

  // state is only available in classes that extend Component
  state = {
    persons: [
      {id: 'a', name: 'Marco', age: 11},
      {id: 'b', name: 'Marcelo', age: 35},
      {id: 'c', name: 'João', age: 20}
    ],
    // this otherState will not be overriden when switchNameHandler is called
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  // #2 lifecycle hook (#1 component update) to be called
  // component update: when props or state changes
  // this lifecycle is used to initialize/update the state based on updated props
  // rarely used
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // Most importante lifecycle hooks: componentDidUpdate, componentDidMount and shouldComponentUpdate

  // #4 lifecycle hook (component creation) to be called
  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  // ES6 arrow function should be used for event handler methods, this way the *this* keyword
  // will always refer to the class object
  switchNameHandler = (newName) => {
    // console.log('was clicked');
    // WRONG, need to use setState method: this.state.persons[0].name = 'Marco Yuri';
    this.setState(
      {
        persons: [
          {name: newName, age: 11},
          {name: 'Marcelo', age: 35},
          {name: 'João', age: 300}
        ]
      }
    );
  }

  nameChangedHandler = (event, id) => {
    
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {...this.state.persons[personIndex]};
    
    // alternative to copy person object
    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    // creating a copy of this.state.persons
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    
    // setState does NOT imediately trigger an update of the state
    // React will schedule the update of the state and will do it when it has the available resources
    //  in this example, the counter won't work
    // this.setState({
    //   persons: persons, 
    //   changeCounter: this.state.changeCounter + 1
    // });

    // if you depend on an old state, use a function as parameter of setState
    // this will make setState to be updated imediately
    this.setState((prevState, props) => {
      return {
        persons: persons, 
        // here React guarantees that this will be the actual previous state
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  deletePersonHandler = (personIndex) => {
    // assigning the pointer to persons array
    // const persons = this.state.persons;
    
    // slice with no args simply copies the array
    // const persons = this.state.persons.slice();

    // another way: use the ES6 spread operator
    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  // #3 lifecycle hook (component creation) to be called
  // then all the child componentes will be rendered like Persons and Person components
  render() {

    console.log('[App.js] render');

    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': { // only possible because of radium package import
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // };

    let persons = null;

    // let btnClass = [classes.Button];

    if (this.state.showPersons) {
      persons = (
        <div>
          {/* {this.state.persons.map((person, index) => {
            return <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name} 
                age={person.age} 
                key={person.id} 
                changed={(event) => this.nameChangedHandler(event, person.id)} />
          })} */}
          {/* {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
                  <Person 
                    click={() => this.deletePersonHandler(index)}
                    name={person.name} 
                    age={person.age} 
                    changed={(event) => this.nameChangedHandler(event, person.id)} />
                </ErrorBoundary>
          })} */}
          <Persons 
              persons={this.state.persons} 
              clicked={this.deletePersonHandler} 
              changed={this.nameChangedHandler} />
        </div>
      );

      // btnClass.push(classes.Red);

      // style.backgroundColor = 'red';
      // style[':hover'] = { // only possible because of radium package import
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    // let assignedClasses = [];

    // if (this.state.persons.length <= 2) {
    //   assignedClasses.push(classes.red);
    // }

    // if (this.state.persons.length <= 1) {
    //   assignedClasses.push(classes.bold);
    // }

    return (
      <Aux>
      {/* <WithClass classes={classes.App}> */}
      {/* <div className={classes.App}> */}
        <button onClick={() => { this.setState({showCockpit: false}); }}>Remove Cockpit</button>
      {/* need to wrap the div inside StyleRoot tag to use Radium CSS media query 
      <StyleRoot> 
      <div className="App"> */}
        {/* <h1>Hi, I'm a React app</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p> */}
        { /* can't use parentesis after function name, otherwise it will be called on page load */ }
        { /* <button onClick={this.switchNameHandler()}>Switch Name</button> */ } 
        { /* <button onClick={this.switchNameHandler}>Switch Name</button> */ }
        {/* <button 
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button> */}
            { /* onClick={() => this.switchNameHandler('Marco !!!!!')}>Switch Name</button> */ }
            {/* <StyledButton alt={this.state.showPersons} 
            onClick={this.togglePersonsHandler}>Toggle Persons</StyledButton> */}
            {/* <button className={btnClass.join(' ')} 
            onClick={this.togglePersonsHandler}>Toggle Persons</button> */}
        { /* using ternary operator */ } 
        { /*
        { this.state.showPersons ? 
          <div>
            <Person 
                name={this.state.persons[0].name} 
                age={this.state.persons[0].age} />
            <Person 
                name={this.state.persons[1].name} 
                age={this.state.persons[1].age}
                // passing a method reference to Person component
                // click={this.switchNameHandler}>
                // click and changed are just a property names, can be any name you want
                click={this.switchNameHandler.bind(this, 'Marco')}
                changed={this.nameChangedHandler}>
              Hobbies: Biking
            </Person>
            <Person 
                name={this.state.persons[2].name} 
                age={this.state.persons[2].age} />
          </div>

          : null
        } */ }
        <AuthContext.Provider 
            value={{
              authenticated: this.state.authenticated, 
              login: this.loginHandler
        }}>
          {this.state.showCockpit ? (
            <Cockpit 
              // accessing the property set on index.js with the this keyword
              title={this.props.appTitle}
              showPersons={this.state.showPersons} 
              personsLength={this.state.persons.length} 
              clicked={this.togglePersonsHandler} />
          ) : null }
          {persons}
        </AuthContext.Provider>
        
      { /* </div>
      </StyleRoot> */ }
      {/* </div> */}
      {/* </WithClass> */}
      </Aux>
    );
  }
}

// export default Radium(App);
// export default App;
export default withClass(App, classes.App);
