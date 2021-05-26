import React, {useEffect, useState} from 'react';
import MapComponent from "../components/map/MapComponent";
import {useControls} from "leva";
import {Fab, Action} from 'react-tiny-fab';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt, faBars, faSignOutAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import {adalConfig, authContext} from "../adalConfig";
import 'react-tiny-fab/dist/styles.css';
import { useHistory } from 'react-router';

const Map = () => {
    const [zoomLevel, setZoomLevel] = useState(11);
    const [mapTheme, setMapTheme] = useState('mapbox://styles/mapbox/streets-v11');
    const [geoJSON, setGeoJSON] = useState(null);
    const handleZoomLevel = zoomLevel => set({zoom: zoomLevel})
    const history = useHistory();

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

    const getToken = () => authContext.getCachedToken(adalConfig.clientId);

    useEffect(() => {
        fetch('https://localhost:6001/api/Listings/locations', {
            headers: new Headers({
                'content-type': 'application/json',
                'Authorization': 'Bearer '+ getToken(),
            }),
        })
            .then(response => response.json())
            .then(data => setGeoJSON(data))
    }, []);

    useEffect(() => {
        setZoomLevel(zoom)
    }, [zoom]);

    useEffect(() => {
        setMapTheme(theme)
    }, [theme]);

    console.log(authContext.getCachedUser())
    
    return (
        <>
            <Fab alwaysShowTitle={true} icon={<FontAwesomeIcon icon={faBars}/>}>
                {authContext.getCachedUser() ? (
                    <Action text="Logout" onClick={() => authContext.logOut()}>
                        <FontAwesomeIcon icon={faSignInAlt}/>
                    </Action>
                ) : (
                    <Action text="Login" onClick={() => authContext.login()}>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                    </Action>
                )}
                {authContext.getCachedUser() && (
                    <Action text="Dashboard" onClick={() => history.push("/account")}>
                        <FontAwesomeIcon icon={faUserCircle}/>
                    </Action>
                )}
            </Fab>
            
            <MapComponent zoom={zoomLevel} mapTheme={mapTheme} handleZoomLevel={handleZoomLevel} geoJSON={geoJSON}/>
        </>
    )
}

export default Map;