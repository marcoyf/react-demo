// if you need to check if all the props and see if any of them have changed,
// then you can extend a PureComponent instead of implementing the method shouldComponentUpdate
// PureComponent already implements shouldComponentUpdate for every props change
import { Component, PureComponent } from 'react';
import Person from './Person/Person';

// const persons = (props) => { 
// class Persons extends Component {
class Persons extends PureComponent {

    // #1 lifecycle hook (component update) to be called
    static getDerivedStateFromProps(props, state) {
        console.log('[Persons.js] getDerivedStateFromProps');
        return state;
    }

    // #2 lifecycle hook (component update) to be called
    // allows to cancel the update process for performance optimizations
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     // optimization: Persons component will only be rendered if it changes
    //     // for example, if the 'Remove Cockpit' is clicked, then it won't be rendered
    //     if (nextProps.persons !== this.props.persons 
    //             || nextProps.changed !== this.props.changed 
    //             || nextProps.clicked !== this.props.clicked) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // #3 lifecycle hook (component update) to be called
    // used for last-minute DOM operations, things like getting the current scrolling position
    // not used very often
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        // return null;
        return { message: 'snapshot message!!!'};
    }

    // #5 lifecycle hook (component update) to be called
    // most used lifecycle hook for component updates
    // componentDidUpdate() {
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    // lifecycle hook to do cleanup
    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    // #4 lifecycle hook (component update) to be called
    // then all the child componentes will be rendered like the Person component
    render() {
        console.log('[Persons.js] rendering...');

        return this.props.persons.map((person, index) => {
            return <Person 
                    click={() => this.props.clicked(index)}
                    name={person.name} 
                    age={person.age} 
                    key={person.id} 
                    changed={(event) => this.props.changed(event, person.id)} />
        });
    }

    // console.log('[Persons.js] rendering...');
    // return props.persons.map((person, index) => {
    //     return <Person 
    //             click={() => props.clicked(index)}
    //             name={person.name} 
    //             age={person.age} 
    //             key={person.id} 
    //             changed={(event) => props.changed(event, person.id)} />
    // });
};

// export default persons;
export default Persons;