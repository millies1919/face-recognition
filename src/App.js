import React from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import FaceRecognition from './components/facerecognition/facerecognition.js';
import Register from './components/register/register';
import SignIn from './components/signin/signin';
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
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': "application.json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: 'fasle'})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render(){
  const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
      <Particles className="particles"
        params={particlesOptions} 
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      { route === 'home' 
      ? <div>
          <Logo />
          <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
          <FaceRecognition imageUrl={imageUrl} box={box}/>
        </div>
      : (
        route === 'signin' 
        ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      )
    }
    </div>
    );
  }
}

export default App;
