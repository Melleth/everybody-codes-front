import React from 'react';
import Row from './row/Row';

type CamerColumnProps = {
   id: number | string,
   label: string,
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
   label,
}: CamerColumnProps) {
   return (
      <td>
         <table id={`column${id}`}>
            <thead>
               <tr>
                  <th colSpan={4}>{label}</th>
               </tr>
               <tr>
                  <th>Number</th>
                  <th>Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
               </tr>
               {
                  content.map((c, i) => (
                     <Row
                        key={i}
                        number={c.number}
                        name={c.name}
                        lat={c.lat}
                        lon={c.lon} />
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