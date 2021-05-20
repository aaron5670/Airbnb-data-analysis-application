import React, {useEffect, useState} from 'react';
import MapComponent from "../components/map/MapComponent";
import {useControls} from "leva";
import {Fab, Action} from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt, faBars} from '@fortawesome/free-solid-svg-icons'

const Map = () => {
    const [zoomLevel, setZoomLevel] = useState(11);
    const [mapTheme, setMapTheme] = useState('mapbox://styles/mapbox/streets-v11');
    const [geoJSON, setGeoJSON] = useState(null);
    const handleZoomLevel = zoomLevel => set({zoom: zoomLevel})

    const [{zoom, theme}, set] = useControls(() => ({
            zoom: {value: 11, min: 0, max: 24},
            theme: {
                options: {
                    streets: 'mapbox://styles/mapbox/streets-v11',
                    satellite: 'mapbox://styles/mapbox/satellite-streets-v11',
                    outdoors: 'mapbox://styles/mapbox/outdoors-v11',
                    light: 'mapbox://styles/mapbox/light-v10',
                    dark: 'mapbox://styles/mapbox/dark-v10',
                }
            }
        }
    ));

    useEffect(() => {
        fetch('https://localhost:5001/api/Listings/locations')
            .then(response => response.json())
            .then(data => setGeoJSON(data))
    }, []);

    useEffect(() => {
        setZoomLevel(zoom)
    }, [zoom]);

    useEffect(() => {
        setMapTheme(theme)
    }, [theme]);

    return (
        <>
            <Fab alwaysShowTitle={true} icon={<FontAwesomeIcon icon={faBars}/>}>
                <Action text="Login" onClick={() => alert('login')}>
                    <FontAwesomeIcon icon={faSignInAlt}/>
                </Action>
            </Fab>

            <MapComponent zoom={zoomLevel} mapTheme={mapTheme} handleZoomLevel={handleZoomLevel} geoJSON={geoJSON}/>
        </>
    )
}

export default Map;