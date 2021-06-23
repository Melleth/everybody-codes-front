import React from 'react';

import { Camera } from '../../../util';

type RowProps = {
   camera: Camera
}

function Row({ camera }: RowProps) {
   return (
      <tr>
         <td>{camera.number}</td>
         <td>{camera.name}</td>
         <td>{camera.lat}</td>
         <td>{camera.lon}</td>
      </tr >
   )
}

export default Row;