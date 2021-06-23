import React from 'react';
import Row from './row/Row';

import { Camera } from '../../util';

import './cameracolumn.css';

type CamerColumnProps = {
   id: number | string,
   label: string,
   content: Camera[],
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
                        camera={c} />
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