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

         {
            cameras.map((camera, i) => (
               <Marker
                  key={i}
                  position={[camera.lat, camera.lon]}>
                  <Popup>
                     <h2>{camera.name}</h2>
                     <p>Latitude: {camera.lat}</p>
                     <p>Longitude: {camera.lon}</p>
                  </Popup>
               </Marker>
            ))
         }
      </MapContainer>
   )
}

export default Map;