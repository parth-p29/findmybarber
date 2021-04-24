import './Map.css'
import logo from '../../Assets/location.png'
import {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react';

const containerStyle = {
    width: '50%',
    height: '55vh'
}   

class GMap extends Component {

    state = {

        center: {
            lat: 43.6677,
            lng: -79.3948
        },

        valuee: ''
    }

    success = (location) => {

        this.setState (
            {
                center: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                }

            }
        )
    }

    getUserLocation = () => {

        navigator.geolocation.getCurrentPosition(this.success);
    }

    render() {
      return (
        
        <div className="main">
            <div className="graph">

                <p>hello</p>

                <div className="input">
                    <button id="permission" onClick={this.getUserLocation}>Use Your Location</button> 

                </div>
                
                <Map 
                google={this.props.google} 

                containerStyle={containerStyle}

                initialCenter={{
                    lat: this.state.center.lat,
                    lng: this.state.center.lng
                }}

                center={{
                    lat: this.state.center.lat,
                    lng: this.state.center.lng
                }}

                zoom={10}>
                    
                    <Marker
                    title={'Your Location'}
                    name={'SOMA'}
                    position={{lat: this.state.center.lat, lng: this.state.center.lng}} />

                    <Circle
                            radius={2400 / 1.609}
                            center={{lat: this.state.center.lat, lng: this.state.center.lng}}
                            onMouseover={() => console.log('mouseover')}
                            onClick={() => console.log('click')}
                            onMouseout={() => console.log('mouseout')}
                            strokeColor='transparent'
                            strokeOpacity={0}
                            strokeWeight={5}
                            fillColor='#FF0000'
                            fillOpacity={0.2}
                        />
        
                </Map>

            </div>
                
        </div>

      );
    }
  }

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA4Pdd37SRTc7S7ppjSgPt8s8Tl0e4PXrU')
  })(GMap)