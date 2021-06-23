import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import CameraColumn from './components/cameracolumn/CameraColumn';
import Map from './components/map/Map';

import './App.css';

// Returns a Promise<State>
const apiGet = () => {
   const url = 'http://localhost:8000/';
   return fetch(url, {})
      .then(response => response)
}

type Record = {
   number: number,
   name: string,
   lat: number,
   lon: number
}

type State = {
   column3: Record[],
   column5: Record[],
   column15: Record[],
   columnOther: Record[],
};

const EmptyState = (): State => {
   return {
      column3: [],
      column5: [],
      column15: [],
      columnOther: [],
   }
}

function App() {
   // Define app state, we will save all the t
   const [content, setContent] = useState<State>(EmptyState);

   // Effect that sets the state from the API response.
   useEffect(() => {
      apiGet().then((response) => {
         response.text().then((text => {
            // Define State that is wrapped by the Promise
            let newState = EmptyState();
            const lines = text.split('\n');


            // Parse response lines into Record, devide Records
            //    to their appropriate bins.
            lines.map((line) => {
               if (line === '') {
                  return;
               }
               const values = line.split(' | ');
               let record: Record = {
                  number: parseInt(values[0]),
                  name: values[1],
                  lat: parseFloat(values[2]),
                  lon: parseFloat(values[3]),
               }

               // Devide records over the appropriate bins.
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
            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
               integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
               crossOrigin=""></script>
         </Helmet>

         <h1>Security cameras Utrecht</h1>
         <Map />
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

