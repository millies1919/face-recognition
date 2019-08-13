import React from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import FaceRecognition from './components/facerecognition/facerecognition.js'
import SignIn from './components/signin/signin'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '908fba15668c496eaae5bedfbc8553f1'
 });

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

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
      const findFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      console.log(findFace)
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: findFace.left_col * width,
        topRow: findFace.top_row * height,
        rightCol: width - (findFace.right_col * width),
        bottomRow: height - (findFace.bottom_row * height),
      }
  }

  displayFaceBox = (box) => {
      this.setState({box: box});
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  render(){
  return (
    <div className="App">
      <Particles className="particles"
        params={particlesOptions} 
      />
      <Navigation />
      <Logo />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/> 
    </div>
    );
  }
}

export default App;
