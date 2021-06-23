import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { Camera } from '../../util';

import './map.css';

type MapProps = {
   cameras: Camera[]
}

function Map({ cameras }: MapProps) {
   return (
      <MapContainer id='mapid' center={[52.0914, 5.1115]} zoom={13} scrollWheelZoom={false}>
         <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            tileSize={512}
            zoomOffset={-1}
            detectRetina={true}
            accessToken='pk.eyJ1IjoiaWh1Z2F0cmVlIiwiYSI6ImNrcTl6ank4ajAzbzYydmsxZXNpYnRwaGsifQ.HmRqJ6hmWqpwjits7U4u1g'
         />
         <Marker position={[51.505, -0.09]}>
            <Popup>
               A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
         </Marker>
      </MapContainer>
   )
}

export default Map;