import './Map.css'
import {Component} from 'react';
import {Map, Marker, GoogleApiWrapper, Circle} from 'google-maps-react';
import Search from './Search';
import axios from 'axios';
import Shop from '../Shop/Shop';

const apiKey = 'YOUR API KEY'

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

        data : [],
        reviews: [],
        shops: '',
        markers: ''
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

        this.setState (
            {
                data: [],
                reviews: [],
                shops: '',
                markers: ''
            }
        )

        const baseUrl = `/maps/api/place/nearbysearch/json?key=${apiKey}`;
        const location = `&location=${this.state.center.lat},${this.state.center.lng}&radius=${this.state.radius}`;
        const keyword = `&keyword=barbershop`;
        const finalUrl =  baseUrl + location + keyword;

        await axios (finalUrl)

            .then(async response => {
                
                const data = response.data.results;

                for (let index = 0; index < 5; index++) {

                    if (data.length == 0){
                        alert('no barbers found');
                        break
                    }

                    const place_id = data[index].place_id
                    const url = `/maps/api/place/details/json?key=${apiKey}&place_id=${place_id}`
                    const fields = '&fields=name,rating,reviews,formatted_address,formatted_phone_number,user_ratings_total,geometry,website'
                    
                    await axios (url + fields)

                    .then(response => {

                        const store_data = response.data.result;

                        const card_data = {
                            'name': store_data.name,
                            'overall_rating': store_data.rating,
                            "total_ratings": store_data.user_ratings_total,
                            'phone': store_data.formatted_phone_number,
                            'address': store_data.formatted_address,
                            'website': store_data.website,
                            'lat': store_data.geometry.location.lat,
                            'lng': store_data.geometry.location.lng,
                            'distance': getDistanceFromLatLonInKm(this.state.center.lat, this.state.center.lng, store_data.geometry.location.lat, store_data.geometry.location.lng)
                        }

                        const review_data = {

                            'reviews' : store_data.reviews
                        }

                        this.setState(prevState => ({
                            data: [...prevState.data, card_data],
                            reviews: [...prevState.reviews, review_data]

                        }))

                    })
                    .catch(err => {
                        alert(err.message);
                    })

                }

            })
            .catch(error => {
                alert('Sorry, I shut down the service for now. Please check my github if you want to use it!')
            })

        this.setState(

            {

                shops:
                    
                    this.state.data.map((shop)=>{
                        
                        return (
                            <Shop 
                                name={shop.name} 
                                o_rating={shop.overall_rating}
                                t_ratings={shop.total_ratings}
                                addy={shop.address}
                                distance={Math.round(shop.distance)}
                                phone={shop.phone}
                                website={shop.website}
                            />
                        )
    
                    }),

                markers: 

                    this.state.data.map((coords)=> {
                        
                        return (
                            <Marker 
                                title={coords.name}
                                position={{lat: coords.lat, lng: coords.lng}}
                            />
                        )
                    })

            }

        )  

    }

    render() {
      return (
        
        <div className="main">
            <div className="graph">
                    
                    <div id="input">

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

                    {this.state.markers}
                </Map>

            </div>

            <div className="box">
                {this.state.shops}
            </div>
    
        </div>

      );
    }
  }

export default GoogleApiWrapper({
    apiKey: (apiKey)
  })(GMap)
