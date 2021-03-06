import React, {useEffect, useState} from "react";
import ReactMapGL, {Source, Layer} from "react-map-gl";
import mapboxgl from "mapbox-gl";
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from '../../helpers/layers';
import CustomPopup from "./CustomPopup";
import config from "../../config";
import 'mapbox-gl/dist/mapbox-gl.css';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MapComponent = ({zoom, mapTheme, handleZoomLevel, geoJSON}) => {
    const [viewport, setViewport] = useState({latitude: 52.370216, longitude: 4.895168, zoom: zoom});
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [stays, setStays] = useState(null);
    const [loadingStays, setLoadingStays] = useState(true);
    
    useEffect(() => {
        setViewport({
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            zoom: zoom
        })
    }, [zoom]);
    
    useEffect(() => {
        if (selectedMarker) {
            setLoadingStays(true)
            fetch(`${config.API_URL}/api/listings/stays?listingId=${selectedMarker.id}`)
                .then(response => response.json())
                .then(data => setStays(data[0]?.stays))
                .then(() => setLoadingStays(false))
        }
    },[selectedMarker])
    
    const mapStyle = {
        width: '100%',
        height: '100%'
    }

    const closePopup = () => setSelectedMarker(null);

    const showDetails = (event) => {
        const listing = event.features.find(i => i.layer.id === 'unclustered-point');
        if (listing !== undefined) {
            setSelectedMarker(listing.properties)
        }
    }

    return (
        <div>
            <ReactMapGL
                mapboxApiAccessToken={config.mapboxApiAccessToken}
                mapStyle={mapTheme}
                {...viewport}
                {...mapStyle}
                style={{position: 'fixed'}}
                onClick={showDetails}
                onViewportChange={(viewport) => {
                    handleZoomLevel(viewport.zoom);
                    setViewport(viewport);
                }}>
                <Source
                    id="inside-airbnb"
                    type="geojson"
                    data={geoJSON}
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} className={'cursor-pointer'} />
                </Source>

                {selectedMarker !== null && (
                    <CustomPopup
                        marker={selectedMarker}
                        stays={stays}
                        loading={loadingStays}
                        closePopup={() => closePopup()}
                    />
                )}
            </ReactMapGL>
        </div>
    )
};

export default MapComponent;