import React, {useState, useEffect} from 'react';

//How do I pass down props for the single record function

const SingleRecordView = (props) => {
    console.log('These are the Single Record props', props)
    // const { record } = props

    

    const [ record, setRecord ] = useState();


    // const getSingleRecord = async () => {
    //     // Get one product from the products table using a fetch request from a route with the id
    //     // const response = method
    //     // const data = await response.json();
    //     setSingleRecords(data);
    // }

    useEffect( () => {
        setRecord(getProductById(record.id));
    });


    // let singleRecordCard = null;

    // if (singleRecord && singleRecord.length) {
    //     singleRecordCard = <div>

    //     </div>
    // };

    return (
        <div>
            <div>
                {
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
                            <button onClick={addToCart(record.id)}>Add to Cart</button>
                        </div>

                    </div>

                }
            </div>
        </div>
    );
},

export default SingleRecordView;