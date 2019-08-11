import React from 'react';
import Navigation from './components/navigation/navigation'
import Logo from './components/logo/logo'
import ImageLinkForm from './components/imagelinkform/imagelinkform'
import Particles from 'react-particles-js'
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800,
          }    
        }
      }
    }

function App() {
  return (
    <div className="App">
      <Particles className="particles"
        params={particlesOptions} 
      />
      <Navigation />
      <Logo />
      <ImageLinkForm />
       {/* <FaceRecognition />*/} 
    </div>
  );
}

export default App;
