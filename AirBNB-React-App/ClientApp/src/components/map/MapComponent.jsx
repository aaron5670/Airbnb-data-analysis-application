import React, {useEffect, useState} from "react";
import ReactMapGL, {Source, Layer} from "react-map-gl";
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from '../../helpers/layers';
import CustomPopup from "./CustomPopup";
import config from "../../config";
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = ({zoom, mapTheme, handleZoomLevel, geoJSON}) => {
    const [viewport, setViewport] = useState({latitude: 52.370216, longitude: 4.895168, zoom: zoom});
    const [selectedMarker, setSelectedMarker] = useState(null);
    
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
                        closePopup={() => closePopup()}
                    />
                )}
            </ReactMapGL>
        </div>
    )
};

export default MapComponent;