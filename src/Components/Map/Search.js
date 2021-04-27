import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import './Search.css'

const Search = ( props ) => {

    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions, } = usePlacesAutocomplete({});

    return (

        <>
            <Combobox onSelect = { async (address) => {

                try{

                    const geoCode = await getGeocode({address});
                    const {lat, lng} = await getLatLng(geoCode[0]);
                    props.goToCoords(lat, lng);

                } catch (err){

                    console.log(err);
                }

            }}>

                <ComboboxInput value = {value} onChange = {(c) => {
                    setValue(c.target.value);
                }} 
                
                disabled = {!ready} 
                placeholder = "Search any City/Region/Address where you want to find barbers..." />

                <ComboboxPopover>
                    {status === "OK" && data.map(({id, description}) => <ComboboxOption key={id} value={description} /> )}
                </ComboboxPopover>

            </Combobox>
        </>
    )

}

export default Search