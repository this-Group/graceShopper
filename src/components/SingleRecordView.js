import React, {useState, useEffect} from 'react';

//How do I pass down props for the single record function

const SingleRecordView = () => {

    const [ singleRecord, setSingleRecords ] = useState();

    const getSingleRecord = async () => {
        // Get one product from the products table using a fetch request from a route with the id
        // const response = method
        // const data = await response.json();
        setSingleRecords(data);
    }

    useEffect( () => {
        getSingleRecord()
    }, []);

    console.log('This is the single record data', singleRecord);

    // Add record to cart method using id

    let singleRecordCard = null;

    if( singleRecord && singleRecord.length){
        singleRecordCard = <div>
            {
                singleRecord.map((singleRecord) =>
                <div key={singleRecord.id}>
                    <div>
                        <img src={singleRecord.picture} alt={singleRecord.title}></img>
                        <h4>{singleRecord.price}</h4>
                    </div>

                    <div>
                        <h4>{singleRecord.title}</h4>
                        <p>{singleRecord.artist}</p>
                        <p>{singleRecord.genre}</p>
                        <p>Qty. {singleRecord.qty}</p>
                    </div>

                    <div>
                    {/* <Link to="/SingleRecordView">View Record</Link> */}
                    <button onClick={addToCart(singleRecord.id)}>Add to Cart</button>
                    </div>

                </div>
                )
            }
        </div>
    };

    return(
        <div>
            <div>
                {singleRecordCard}
            </div>
        </div>
    );
},

export default SingleRecordView;