export type Camera = {
   number: number,
   name: string,
   lat: number,
   lon: number
}

export type State = {
   column3: Camera[],
   column5: Camera[],
   column15: Camera[],
   columnOther: Camera[],
};

export const EmptyState = (): State => {
   return {
      column3: [],
      column5: [],
      column15: [],
      columnOther: [],
   }
}

// Returns a Promise<State>
export const apiGet = () => {
   const url = 'http://localhost:8000/';
   return fetch(url, {})
      .then(response => response)
}