export type Camera = {
   number: number,
   name: string,
   lat: number,
   lon: number
}

// State tracks the different column
// contents.
export type State = {
   column3: Camera[],
   column5: Camera[],
   column15: Camera[],
   columnOther: Camera[],
};

// Helper fn that we use to initialize state
export const EmptyState = (): State => {
   return {
      column3: [],
      column5: [],
      column15: [],
      columnOther: [],
   }
}

// Returns a Promise<Response>
export const apiGet = () => {
   const url = 'http://localhost:8000/';
   return fetch(url, {})
      .then(response => response)
}