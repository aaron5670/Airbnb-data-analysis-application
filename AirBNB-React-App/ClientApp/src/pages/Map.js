import React, {useEffect, useState} from 'react';
import MapComponent from "../components/map/MapComponent";
import {useControls} from "leva";
import {Fab, Action} from 'react-tiny-fab';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt, faBars, faSignOutAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import {adalConfig, authContext} from "../adalConfig";
import {useHistory} from 'react-router';
import 'react-tiny-fab/dist/styles.css';

const Map = () => {
    const [zoomLevel, setZoomLevel] = useState(11);
    const [mapTheme, setMapTheme] = useState('mapbox://styles/mapbox/streets-v11');
    const [geoJSON, setGeoJSON] = useState(null);
    const [filteredGeoJSON, setFilteredGeoJSON] = useState(null);
    const handleZoomLevel = zoomLevel => set({zoom: zoomLevel})
    const history = useHistory();

    const [{zoom, theme, maxPrice}, set] = useControls(() => ({
            zoom: {value: 11, min: 0, max: 24, label: 'Zoom level'},
            theme: {
                options: {
                    streets: 'mapbox://styles/mapbox/streets-v11',
                    satellite: 'mapbox://styles/mapbox/satellite-streets-v11',
                    outdoors: 'mapbox://styles/mapbox/outdoors-v11',
                    light: 'mapbox://styles/mapbox/light-v10',
                    dark: 'mapbox://styles/mapbox/dark-v10',
                },
                label: 'Theme'
            },
            maxPrice: {
                value: 2000,
                min: 0,
                label: 'Maximum price'
            },
            neighbourhood: {
                options: {
                    "Amsterdam Centrum": "Amsterdam Centrum",
                    "Banne Buiksloot": "Banne Buiksloot",
                    "Bos en Lommer": "Bos en Lommer",
                    "Buiksloterham": "Buiksloterham",
                    "Buikslotermeer": "Buikslotermeer",
                    "Buitenveldert-Oost": "Buitenveldert-Oost",
                    "Buitenveldert-West": "Buitenveldert-West",
                    "De Pijp": "De Pijp",
                    "De Wallen": "De Wallen",
                    "Frederik Hendrikbuurt": "Frederik Hendrikbuurt",
                    "Grachtengordel": "Grachtengordel",
                    "Hoofddorppleinbuurt": "Hoofddorppleinbuurt",
                    "IJplein en Vogelbuurt": "IJplein en Vogelbuurt",
                    "Indische Buurt": "Indische Buurt",
                    "Jordaan": "Jordaan",
                    "Kadoelen": "Kadoelen",
                    "Landelijk Noord": "Landelijk Noord",
                    "Museumkwartier": "Museumkwartier",
                    "Nieuwendammerdijk en Buiksloterdijk": "Nieuwendammerdijk en Buiksloterdijk",
                    "Nieuwendammerham": "Nieuwendammerham",
                    "Nieuwendam-Noord": "Nieuwendam-Noord",
                    "Nieuwmarkt en Lastage": "Nieuwmarkt en Lastage",
                    "Oost": "Oost",
                    "Oostelijke Eilanden en Kadijken": "Oostelijke Eilanden en Kadijken",
                    "Oosterparkbuurt": "Oosterparkbuurt",
                    "Oostzanerwerf": "Oostzanerwerf",
                    "Osdorp": "Osdorp",
                    "Oud-West": "Oud-West",
                    "Oud-Zuid": "Oud-Zuid",
                    "Overtoomse Veld": "Overtoomse Veld",
                    "Rivierenbuurt": "Rivierenbuurt",
                    "Slotermeer-Noordoost": "Slotermeer-Noordoost",
                    "Slotermeer-Zuidwest": "Slotermeer-Zuidwest",
                    "Slotervaart": "Slotervaart",
                    "Spaarndammer en Zeeheldenbuurt": "Spaarndammer en Zeeheldenbuurt",
                    "Stadionbuurt": "Stadionbuurt",
                    "Tuindorp Buiksloot": "Tuindorp Buiksloot",
                    "Tuindorp Nieuwendam": "Tuindorp Nieuwendam",
                    "Tuindorp Oostzaan": "Tuindorp Oostzaan",
                    "Volewijck": "Volewijck",
                    "Watergraafsmeer": "Watergraafsmeer",
                    "Weesperbuurt en Plantage": "Weesperbuurt en Plantage",
                    "Westelijke Eilanden": "Westelijke Eilanden",
                    "Zeeburg": "Zeeburg"
                },
                label: 'Neighbourhood'
            },
        }
    ));

    const getToken = () => authContext.getCachedToken(adalConfig.clientId);

    useEffect(() => {
        fetch('https://airbnb-react-app.azurewebsites.net/api/listings/locations', {
            headers: new Headers({
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }),
        })
            .then(response => response.json())
            .then(data => {
                setGeoJSON(data)
                setFilteredGeoJSON(data)
            })
    }, []);

    /** Zoom level **/
    useEffect(() => {
        setZoomLevel(zoom)
    }, [zoom]);

    /** Theme **/
    useEffect(() => {
        setMapTheme(theme)
    }, [theme]);

    /** Max price **/
    useEffect(() => {
        if (geoJSON) {
            const data = geoJSON.features.filter(listing => listing.properties.price <= maxPrice);
            
            setFilteredGeoJSON({
                features: data,
                type: "FeatureCollection"
            })
        }
    }, [maxPrice]);

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

            <MapComponent zoom={zoomLevel} mapTheme={mapTheme} handleZoomLevel={handleZoomLevel}
                          geoJSON={filteredGeoJSON}/>
        </>
    )
}

export default Map;