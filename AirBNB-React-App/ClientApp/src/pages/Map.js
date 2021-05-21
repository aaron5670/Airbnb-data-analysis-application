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
                // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiI4NmI4ODE3Yy1hY2I5LTQ3YjgtYWVlYS1mNDUzNGVmMzg2OWUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9lZGJiYTM4Ny00MjBkLTQzMDgtOGRkOS01OWQyYjFlMTY1NDcvIiwiaWF0IjoxNjIxNjA4MjIzLCJuYmYiOjE2MjE2MDgyMjMsImV4cCI6MTYyMTYxMjEyMywiYWlvIjoiQVVRQXUvOFRBQUFBYVVwR3ZuZkJIRDIrcUZGQW5tblNBSVVseHc1Y3Riank0NDAzRlNtVGpaQ1lVWGdZTVhGOTJEeVl0dSs5YmVQa1ZwUlAvOWpBWkZ3TThpejdMUS9mQ0E9PSIsImFtciI6WyJwd2QiXSwiZW1haWwiOiJBQi52YW5kZW5CZXJnMUBzdHVkZW50Lmhhbi5ubCIsImZhbWlseV9uYW1lIjoiQmVyZyB2YW4gZGVuIiwiZ2l2ZW5fbmFtZSI6IkFCLnZhbmRlbkJlcmcxQHN0dWRlbnQuaGFuLm5sIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNWQ3M2U3YjctYjNlMS00ZDAwLWIzMDMtMDU2MTQwYjJhM2I0LyIsImlwYWRkciI6IjgzLjEyOC42NS4yMTgiLCJuYW1lIjoiQUIudmFuZGVuQmVyZzFAc3R1ZGVudC5oYW4ubmwgQmVyZyB2YW4gZGVuIiwibm9uY2UiOiI1NzQyN2IzOS05YjIzLTQ4NjMtODkwMC1kZGZiOTQ4ZDJiZDMiLCJvaWQiOiJlZTAwZmVmMi04MTMxLTRhNGQtYTNjYS1kYjY1YTk0OGRjODMiLCJyaCI6IjAuQVlJQWg2Tzc3UTFDQ0VPTjJWblNzZUZsUjN5QnVJYTVyTGhIcnVyMFUwN3pocDZDQU1nLiIsInN1YiI6IndPTGNjZ2FvbEllMWJtdDJrXzlxRW1Idi14d016blRXYVFiOWJ2czVzUUkiLCJ0aWQiOiJlZGJiYTM4Ny00MjBkLTQzMDgtOGRkOS01OWQyYjFlMTY1NDciLCJ1bmlxdWVfbmFtZSI6IkFCLnZhbmRlbkJlcmcxQHN0dWRlbnQuaGFuLm5sIiwidXRpIjoiY1ZnOGl1WXc5RWE4ckpxdzRfLVpBQSIsInZlciI6IjEuMCJ9.CQQBT8E1xkA_8CLm0baEhA6X33IoW9ZmjNo2WJuKM1Qr6CRoT_ej6kOyuEA7CZN-8tgKY41C3s8MkiLvrQQMbIP4Zg1rqS2qANLmgAmisINKNlotvXQqSw8OxO7oKq7u_stqnTuqf7eThdf76LUUbsvMApCYDbgj_nQTWlRi8Z3mM4lmmg87X9nz9ZlZ20Y-Xt4L42Tbg1UeWLEW7EYgNJIKlAC8HVQFDVfRSYpqZa7_TT_ylPbT2LLDHJWpGHOH-w2oJ573yYTXJKrath5H7YrHhhhn48qdlzDk6R_xMkvzJkYh422J0pT20AajDjzA_HjCrPeF2IdNITCisUW2lg',
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