import {withGoogleMap,   GoogleMap, Marker } from "react-google-maps";
import Title from '../../Components/Title/Title';

const getCurrentPosition = (callback) => {

    if (navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position) => {

            callback(position.coords.latitude, position.coords.longitude);
        });
    }

    else {
        return ("Can't get your location.");
    }
}

const MainPage = withGoogleMap(() =>
    <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >

    </GoogleMap>
)

export default MainPage