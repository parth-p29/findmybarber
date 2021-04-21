import './Map.css'
import logo from '../../Assets/location.png'
import {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const containerStyle = {
    width: '50%',
    height: '55vh'
}   

class GMap extends Component {

    state = {

        center: {
            lat: 43.6677,
            lng: -79.3948
        }
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

                <button id="permission" onClick={this.getUserLocation}>Use Your Location</button> 
                
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

                zoom={11}>
                    
                    <Marker
                    title={'Your Location'}
                    name={'SOMA'}
                    position={{lat: this.state.center.lat, lng: this.state.center.lng}} />
        
                </Map>

            </div>

            <div className="stores">
                
            </div>
    </div>

      );
    }
  }

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA4Pdd37SRTc7S7ppjSgPt8s8Tl0e4PXrU')
  })(GMap)