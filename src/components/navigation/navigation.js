import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if (isSignedIn) { return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer br3 ba dark-gray b--black-10 mv4  mw6 shadow-5'>Sign Out</p>
        </nav>
        )} else { return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer br3 ba dark-gray b--black-10 mv4  mw6 shadow-5'>Sign In</p>
            <p onClick={() => onRouteChange('signup')} className='f3 link dim black underline pa3 pointer br3 ba dark-gray b--black-10 mv4  mw6 shadow-5'>Sign Up</p>
        </nav>
        )}
};

export default Navigation;