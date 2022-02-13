import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import AllRecordsView from './AllRecordsView';

import {
  getSomething,
  // getAllProducts
} from '../api';




const App = () => {
    console.log('hello from App')
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });

  //---------------------------------------------------------

//   const [ records, setRecords ] = useState();

//   useEffect( () => {
//     setRecords(getAllProducts())
// }, []);


//   const [ singleRecord, setSingleRecords ] = useState();

//   useEffect( () => {
//     setSingleRecords(getProductById());
// }, []);

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      {/* <h2>{ message }</h2> */}


      {/* <Route path="/allrecords" component={AllRecordsView} />
      <AllRecordsView records={records}/> 
      </Route>
      */}
    </div>
  );
}

export default App;