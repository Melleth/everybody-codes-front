import React from 'react';
import Row from './row/Row';

type CamerColumnProps = {
   id: number | string,
   content: {
      number: number,
      name: string,
      lat: number,
      lon: number
   }[],
}

function CameraColumn({
   id,
   content,
}: CamerColumnProps) {
   return (
      <td>
         <table id={`column${id}`}>
            <thead>
               <tr>
                  <th colSpan={4}>Cameras 3</th>
               </tr>
               <tr>
                  <th>Number</th>
                  <th>Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
               </tr>
               {
                  content.map((i) => (
                     <Row
                        number={i.number}
                        name={i.name}
                        lat={i.lat}
                        lon={i.lon} />
                  ))
               }
            </thead>
            <tbody>
            </tbody>
         </table>
      </td>
   )
}

export default CameraColumn;