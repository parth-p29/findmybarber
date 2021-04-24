import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";


  const Search = (props) => {

    const {} = usePlacesAutocomplete({

        requestOptions: {
            location: {
                lat: props.lat,
                lng: props.lng
            }
        }
    })

  }