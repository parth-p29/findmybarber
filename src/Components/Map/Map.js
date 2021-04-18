import GoogleMapReact from 'google-map-react';
import './Map.css'
import Location from './Location';
import {useState} from 'react'

const Map = () => {

    const userLocation = Location();
  
    return (    

        <div className="graph">

            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA4Pdd37SRTc7S7ppjSgPt8s8Tl0e4PXrU"}}

                center={userLocation.center}

                defaultZoom={12}
            />

        </div>

    )


}

export default Map