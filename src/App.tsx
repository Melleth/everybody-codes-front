import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import CameraColumn from './components/cameracolumn/CameraColumn';
import Map from './components/map/Map';

import { Camera, State, EmptyState, apiGet } from './util';

import './App.css';


function App() {
   // Define app state, see util.ts for type
   const [content, setContent] = useState<State>(EmptyState);

   // Effect that sets the state from the API response.
   useEffect(() => {
      apiGet().then((response) => {
         response.text().then((text => {
            // Define state object that we will fill with response data.
            let newState = EmptyState();
            const lines = text.split('\n');

            // Parse response lines into Record, divide Records
            //    to their appropriate bins.
            lines.map((line) => {
               if (line === '') {
                  return;
               }

               const values = line.split(' | ');
               let record: Camera = {
                  number: parseInt(values[0]),
                  name: values[1],
                  lat: parseFloat(values[2]),
                  lon: parseFloat(values[3]),
               }

               // Divide records over the appropriate bins.
               if (record.number % 3 === 0) {
                  if (record.number % 5 === 0) {
                     // Bin to 3 and 5
                     newState.column15.push(record);
                  } else {
                     // Bin to 3
                     newState.column3.push(record);
                  }
               } else if (record.number % 5 === 0) {
                  // Bin to 5
                  newState.column5.push(record);
               } else {
                  // Bin to other
                  newState.columnOther.push(record);
               }
            });

            // Finally set the state.
            setContent(newState);
         }))
      })
   }, []);

   return (
      <div className='application'>
         <Helmet>
            <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
            <meta charSet="utf-8" />
            <title>Infi | Security cameras Utrecht</title>
            <link rel="icon" type="image/x-icon" href="video-camera-icon.png" />
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
               integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
               crossOrigin="" />
         </Helmet>

         <h1>Security cameras Utrecht</h1>

         <Map
            cameras={[...content.column3, ...content.column5, ...content.column15, ...content.columnOther]}
         />

         <div id='source'>
            source:
            <a href="https://data.overheid.nl/data/dataset/camera-s">https://data.overheid.nl/data/dataset/camera-s</a>
         </div>

         <main>
            <table id="cameraTableContainer">
               <tbody>
                  <tr>
                     <CameraColumn
                        id={3}
                        label='Cameras 3'
                        content={content.column3} />
                     <CameraColumn
                        id={5}
                        label='Cameras 5'
                        content={content.column5} />
                     <CameraColumn
                        id={35}
                        label='Cameras 3 &amp; 5'
                        content={content.column15} />
                     <CameraColumn
                        id='Other'
                        label='Cameras overig'
                        content={content.columnOther} />
                  </tr>
               </tbody>
            </table>
         </main>
      </div >
   )
}

export default App;

