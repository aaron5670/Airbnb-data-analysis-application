﻿import React, {useEffect, useState} from "react";
import ReactMapGL, {Marker, Source, Layer} from "react-map-gl";
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from '../../helpers/layers';
import CustomMarker from "./CustomMarker";
import CustomPopup from "./CustomPopup";
import Geocoder from "react-mapbox-gl-geocoder";
import config from "../../config";
import 'mapbox-gl/dist/mapbox-gl.css';

//Demo data
import DATA from '../../locations.geojson';

const MapComponent = ({zoom, mapTheme, handleZoomLevel}) => {
    const [viewport, setViewport] = useState({latitude: 52.139260, longitude: 6.525730, zoom: zoom});
    const [tempMarker, setTempMarker] = useState({name: null, longitude: 1, latitude: 1});
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        setViewport({
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            zoom: zoom
        })
    }, [zoom]);

    const mapStyle = {
        width: '100%',
        height: '100%'
    }

    const params = {
        country: "nl"
    }

    const onSelected = (viewport, item) => {
        setViewport(viewport);
        setTempMarker({
            name: item.place_name,
            longitude: item.center[0],
            latitude: item.center[1]
        });
    }

    const addMarker = () => {
        setMarkers(prevState => [...prevState, tempMarker]);
        setTempMarker(null);
    }

    const removeMarker = (index) => {
        setMarkers(prevState => prevState.filter((marker, i) => index !== i));
        setSelectedMarker(null)
    }

    const openPopup = (index) => setSelectedMarker(index);
    const closePopup = () => setSelectedMarker(null);

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
    };

    return (
        <div>
            <Geocoder
                mapboxApiAccessToken={config.mapboxApiAccessToken}
                onSelected={onSelected}
                viewport={viewport}
                hideOnSelect={true}
                value=""
                queryParams={params}
            />

            <button color="primary" onClick={() => addMarker()}>Add</button>

            <ReactMapGL
                mapboxApiAccessToken={config.mapboxApiAccessToken}
                mapStyle={mapTheme}
                {...viewport}
                {...mapStyle}
                style={{position: 'fixed'}}
                onViewportChange={(viewport) => {
                    handleZoomLevel(viewport.zoom);
                    setViewport(viewport);
                }}>


                <Source
                    id="my-data"
                    type="geojson"
                    data={DATA}
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} />
                </Source>

                {tempMarker && (
                    <Marker
                        longitude={tempMarker.longitude}
                        latitude={tempMarker.latitude}>
                        <div className="marker temporary-marker"><span/></div>
                    </Marker>
                )}

                {markers.map((marker, index) => {
                    return (
                        <CustomMarker
                            key={`marker-${index}`}
                            index={index}
                            marker={marker}
                            openPopup={() => openPopup(index)}
                        />
                    )
                })}

                {selectedMarker !== null && (
                    <CustomPopup
                        index={selectedMarker}
                        marker={markers[selectedMarker]}
                        closePopup={() => closePopup()}
                        remove={removeMarker}
                    />
                )}
            </ReactMapGL>
        </div>
    )
};

export default MapComponent;