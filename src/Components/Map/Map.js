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

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

class GMap extends Component {

    state = {

        center: {
            lat: 43.6677,
            lng: -79.3948
        },

        radius: 1000,

        display: {
            style: "none",
            clicked: false
        },

        data : []
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

    setRange = (val) => {

        this.setState (
            {
                radius: val.target.value
            }
        )
    }

    submit = async () => {

        //const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const baseUrl = `/maps/api/place/nearbysearch/json?key=${apiKey}`;
        const location = `&location=${this.state.center.lat},${this.state.center.lng}&radius=${this.state.radius}`;
        const keyword = `&keyword=barbershop`;
        const finalUrl =  baseUrl + location + keyword;
        console.log(finalUrl);

        await axios (finalUrl)

            .then(async response => {
                
                const data = response.data.results;
                console.log(response);
                for (let index = 0; index < 5; index++) {

                    // const card_data = {

                    //     'name': data.name,
                    //     'address': data.vicinity,
                    //     'overall_rating': data.rating,
                    //     'total_rates': data.user_ratings_total
                    //     //'distance' : getDistanceFromLatLonInKm(this.state.center.lat, this.state.center.lng, data.geometry.location.lat, data.geometry.location.lng)

                    // }

                    //console.log(card_data);

                    const place_id = data[index].place_id
                    const url = `/maps/api/place/details/json?key=${apiKey}&place_id=${place_id}`
                    const fields = '&fields=name,rating,reviews,vicinity,formatted_phone_number,user_ratings_total,geometry,opening_hours,website,photo,price_level'
                    
                    await axios (url + fields)

                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(err => {
                        alert(err.message);
                    })

                }

            })
            .catch(error => {
                //alert(`${error.message} - The session as ended. Please visit: http://cors-anywhere.herokuapp.com/corsdemo and click on 'request temporary access' to restart CORS session.`);
                alert(error.message)
            })

    }

    changeDisplay = () => {

        this.setState (

            {
                display: {
                    style: this.state.display.clicked ? 'none' : 'block',
                    clicked: this.state.display.clicked ? false : true
                }
            }
        )
    }

    render() {
      return (
        
        <div className="main">
            <div className="graph">
                    
                    <div className="show">
                        <p className="permission" onClick={this.changeDisplay}>Setup Search</p>
                    </div>

                    <div id="input" style={{display: this.state.display.style}}>

                        <select name='radius' onChange={this.setRange}>
                                <option value="none" selected disabled>
                                    Choose a Search Radius
                                </option>
                                <option value={1000}>1km</option>
                                <option value={3000}>3km</option>
                                <option value={5000}>5km</option>
                                <option value={10000}>10km</option>
                                <option value={15000}>15km</option>
                                <option value={20000}>20km</option>
                        </select>

                        <div className="location">

                            <Search goToCoords={this.goToCoords} />
                            <p>or</p>
                            <button className="permission" onClick={this.getUserLocation}>Use Your Location</button> 

                        </div>
                        
                        <div className="submit">
                            <button className="permission" onClick={this.submit}>Find Barbers</button>
                        </div>

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

                zoom={11}>
                    
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