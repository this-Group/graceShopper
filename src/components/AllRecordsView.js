import React, {useState, useEffect} from 'react';
import { Route, Link, Switch } from 'react-router-dom';

const RecordsView = () => {

    const [ records, setRecords ] = useState();

    // const getAllRecords = async () => {
    //     // Get all products from the products table using a fetch request from a route
    //     // const response = method
    //     // const data = await response.json();
    //     setRecords(data);
    // }

    useEffect( () => {
        setRecords(getAllProducts())
    }, []);

    console.log('This is our records data', records);

    let singleRecordCards = null;

    if( records && records.length){
        singleRecordCards = <div>
            {
                records.map((record) =>
                <div key={record.id}>
                    <div>
                        <img src={record.picture} alt={record.title}></img>
                        <h4>{record.price}</h4>
                    </div>

                    <div>
                        <h4>{record.title}</h4>
                        <p>{record.artist}</p>
                        <p>{record.genre}</p>
                        <p>Qty. {record.qty}</p>
                    </div>

                    <div>
                    {/* <Link to="/SingleRecordView">View Record</Link> */}
                    <button onClick={addToCart(record.id)}>Add to Cart</button>
                    </div>

                </div>
                )
            }
        </div>
    };

    return(
        <div>
            <h2>Records</h2>
            <div>
                {singleRecordCards}
            </div>
        </div>
    );
};

export default RecordsView