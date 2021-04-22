import React, {useEffect, useState} from 'react';
import MapComponent from "../components/map/MapComponent";
import {useControls} from "leva";

const Map = () => {
    const [zoomLevel, setZoomLevel] = useState(11);
    const [mapTheme, setMapTheme] = useState('mapbox://styles/mapbox/streets-v11');

    const {zoom, theme} = useControls({
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
    )

    useEffect(() => {
        setZoomLevel(zoom)
    }, [zoom])

    useEffect(() => {
        setMapTheme(theme)
    }, [theme])
    
    
    return (
        <div>
            <MapComponent zoom={zoomLevel} mapTheme={mapTheme}/>
        </div>
    )
}

export default Map;