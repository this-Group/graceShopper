// import React, { useState, useEffect } from 'react';
// import { Route, Link, Switch } from 'react-router-dom';
// import SingleRecordView from './SingleRecordView';

// const AllRecordsView = (props) => {
//     console.log('This is the All Records comp props', props);

//     const { records } = props;

//     // const [ records, setRecords ] = useState();

//     // const getAllRecords = async () => {
//     //     // Get all products from the products table using a fetch request from a route
//     //     // const response = method
//     //     // const data = await response.json();
//     //     setRecords(data);
//     // }

//     // useEffect( () => {
//     //     setRecords(getAllProducts())
//     // }, []);


//     // let singleRecordCards = null;

//     // if (records && records.length) {
//     //     singleRecordCards = <div>

//     //     </div>
//     // };

//     return (
//         <Switch>
//             <Route exact path="/">
//                 <div>
//                     <h2>Records</h2>
//                     <div>
//                         {
//                             records ? records.map((record) => {
//                                 return (
//                                     <div key={record.id}>
//                                         <div>
//                                             <img src={record.picture} alt={record.title}></img>
//                                             <h4>{record.price}</h4>
//                                         </div>

//                                         <div>
//                                             <h4>{record.title}</h4>
//                                             <p>{record.artist}</p>
//                                             <p>{record.genre}</p>
//                                             <p>Qty. {record.qty}</p>
//                                         </div>

//                                         <div>
//                                             <div>


//                                             </div>
//                                             <a href={`/:${record.id}`}>
//                                                 <button>View Record</button>
//                                             </a>
//                                             <button onClick={addToCart(record.id)}>Add to Cart</button>
//                                         </div>

//                                     </div>
//                                 )
                                
//                             }) : 'Loading'
//                         }
//                     </div>
//                 </div>
//             </Route>

//             <Route>
//                 <SingleRecordView record={record} />
//             </Route>

//         </Switch >
//     );
// };

// export default AllRecordsView