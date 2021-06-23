import React from 'react';

type RowProps = {
   number: number,
   name: string,
   lat: number,
   lon: number,
}

function Row({
   number,
   name,
   lat,
   lon,
}: RowProps) {
   return (
      <tr>
         <td>{number}</td>
         <td>{name}</td>
         <td>{lat}</td>
         <td>{lon}</td>
      </tr >
   )
}

export default Row;