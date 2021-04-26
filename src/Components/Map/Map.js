import './Map.css'
import {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react';
import Search from './Search';
import axios from 'axios';

const apiKey = 'AIzaSyA4Pdd37SRTc7S7ppjSgPt8s8Tl0e4PXrU'

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

        radius: 5000

    }

    goToCoords = (newLat, newLng) => {

        this.setState (
            {
                center: {
                    lat: newLat,
                    lng: newLng
                }
            }
        )
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

    submit = async () => {

        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}`;
        const location = `&location=${this.state.center.lat},${this.state.center.lng}&radius=${this.state.radius}`;
        const keyword = `&keyword=barbershop`;
        const finalUrl = corsProxy + baseUrl + location + keyword;

        await axios ({
            method: 'GET',
            url: finalUrl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
            }
        })
            
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.message);
        })

    }

    render() {
      return (
        
        <div className="main">
            <div className="graph">
            
                    <div className="input">

                        <button id="permission" onClick={this.getUserLocation}>Use Your Location</button> 
                        <Search goToCoords={this.goToCoords} />
                        
                        <button id="permission" onClick={this.submit}>Search</button>

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
                            radius={(this.state.radius) / 1.609}
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
    apiKey: (apiKey)
  })(GMap)