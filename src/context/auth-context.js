import React from 'react';

// context is like a global available JavaScript object
const authContext = React.createContext({
    authenticated: false,
    login: () => {}
});

export default authContext;