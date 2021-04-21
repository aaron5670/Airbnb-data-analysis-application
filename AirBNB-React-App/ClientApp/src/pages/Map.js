import React, {useState} from 'react';
import ReactMapboxGl, {Layer, Marker, Popup, Feature, GeoJSONLayer} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
    const [popup, setPopup] = useState({show: false, lat: 0, lon: 0});
    
    const Map = ReactMapboxGl({
        accessToken: 'pk.eyJ1IjoiYWFyb25zY2hvb2xubCIsImEiOiJja25yaXVkZXkyOGN2MnFueHliMWNqcWh3In0.liC0vj-4D-zSKdHVkKHSXw'
    });

    const zoom = [8];


    /**GeoJSON**/
    const geojson = require('../geojson.json');
    const circleLayout = {visibility: 'visible'};
    const circlePaint = {
        'circle-color': 'white'
    };
    const symbolLayout = {
        'text-field': '{place}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.6],
        'text-anchor': 'top'
    };
    const symbolPaint = {
        'text-color': 'white'
    };

    console.log(popup)
    
    return (
        <div>
            <h1>Map</h1>

            <Map
                // style="mapbox://styles/mapbox/streets-v9"
                style="mapbox://styles/mapbox/dark-v10"
                zoom={zoom}
                containerStyle={{
                    height: '60vh',
                    width: '70vw'
                }}
            >

                <GeoJSONLayer
                    data={geojson}
                    circleLayout={circleLayout}
                    circlePaint={circlePaint}
                    circleOnClick={(e) => {
                        console.log(e)
                        console.log(e.lngLat.lat)
                        setPopup({show: true, lat: e.lngLat.lat, lon: e.lngLat.lng})
                    }}
                    symbolLayout={symbolLayout}
                    symbolPaint={symbolPaint}
                />

                <Marker
                    coordinates={[-0.2416815, 51.5285582]}
                    anchor="bottom">
                    <svg height="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         viewBox="0 0 365 560" enableBackground="new 0 0 365 560">
                        <g>
                            <path fill="#00AEEF" d="M182.9,551.7c0,0.1,0.2,0.3,0.2,0.3S358.3,283,358.3,194.6c0-130.1-88.8-186.7-175.4-186.9
                                C96.3,7.9,7.5,64.5,7.5,194.6c0,88.4,175.3,357.4,175.3,357.4S182.9,551.7,182.9,551.7z M122.2,187.2c0-33.6,27.2-60.8,60.8-60.8
                                c33.6,0,60.8,27.2,60.8,60.8S216.5,248,182.9,248C149.4,248,122.2,220.8,122.2,187.2z"/>
                        </g>
                    </svg>
                    
                </Marker>
                
                <Popup coordinates={[-0.2416815, 51.5585582]}>
                    Dit werkt donders
                </Popup>

            </Map>

        </div>
    )
}

export default Map;