import {useState, useEffect} from 'react'

const Location = () => {

    const [location, setLocation] = useState({
    
        center: {
            lat: '', 
            lng: ''
        }

    });

    const success = (location) => {

        setLocation({

            center: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }

        })

    }

    const error = () => {
        alert("An error has occured in retrieving your location.");
    }

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(success, error);

    }, []);

    return location;

}

export default Location;