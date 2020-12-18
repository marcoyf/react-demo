// const withClass = props => (
//     <div className={props.classes}>
//         {props.children}
//     </div>
// );

// another way to create a HOC
// this is a normal JavaScript function, not a React component
// need to call it in the export of the App component
const withClass = (WrappedComponent, className) => {
    return props => ( // this is another function, this time a React component
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withClass;