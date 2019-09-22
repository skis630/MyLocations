import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

function GoogleMap(props) {
    let mapStyles = {
        width: '50%',
        height: "95%",
    }
    return (
        <Map
            google={props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={{ lat: props.lat, lng: props.long}}
        >
            <Marker position={{ lat: props.lat, lng: props.long}} />
        </Map>
    )
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyAKpzTMgRZ88ufzaOIs_thqAb3lkM4OKDg'
  })(GoogleMap);
