import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

//import CameraColumn from './components/cameracolumn/CameraColumn';

import './App.css';

const apiGet = (setState: Dispatch<SetStateAction<State>>) => {
   const url = 'http://localhost:8000/';

   return fetch(url, {})
      .then(response => {
         response.text().then((text => {
            console.debug(text);
         }))
      })
      .catch(error => console.debug(error))


}

type Records = {
   number: number,
   name: string,
   lat: number,
   lon: number
}

type State = {
   column3: Records[] | undefined,
   column5: Records[] | undefined,
   column15: Records[] | undefined,
   columnOther: Records[] | undefined,
};

const EmptyState = (): State => {
   return {
      column3: undefined,
      column5: undefined,
      column15: undefined,
      columnOther: undefined,
   }
}

function App() {
   const [content, setContent] = useState<State>(EmptyState);

   useEffect(() => {
      apiGet(setContent)
   }, []);

   return (
      <div className='application'>

         <Helmet>
            <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
            <meta charSet="utf-8" />
            <title>Infi | Security cameras Utrecht</title>
            <link rel="icon" type="image/x-icon" href="video-camera-icon.png" />
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
         </Helmet>

         <h1>Security cameras Utrecht</h1>
         <div id='mapid'></div>
         <div id='source'>
            source:
            <a href="https://data.overheid.nl/data/dataset/camera-s">https://data.overheid.nl/data/dataset/camera-s</a>
         </div>
         <main>
            <table id="cameraTableContainer">
               <tbody>
                  <tr>
                     {/* <CameraColumn
                        id={3}
                        content={{}} />
                     <CameraColumn
                        id={5}
                        content={{}} />
                     <CameraColumn
                        id={15}
                        content={{}} />
                     <CameraColumn
                        id='Other'
                        content={{}} /> */}
                  </tr>
               </tbody>
            </table>
         </main>
      </div >
   )
}

export default App;

