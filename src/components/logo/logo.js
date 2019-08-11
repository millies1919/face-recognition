import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import face from './faceicon.png';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner pa3"> <img alt='logo' style={{paddingTop: '20px'}} src={face}/> </div>
            </Tilt>
        </div>
    )
};

export default Logo;