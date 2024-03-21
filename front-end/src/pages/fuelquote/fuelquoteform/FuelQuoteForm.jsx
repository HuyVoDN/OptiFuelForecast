import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { TextField, Button, Typography } from '@mui/material';
import "./FuelQuoteForm.scss";

const FuelQuoteForm = () => {
    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
    function convertDateToSQLFormat(dateString) {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    const [DeliveryAddress, setDeliveryAddress] = useState('');
    const [DeliveryDate, setDeliveryDate] = useState('');
    const [FuelAmount, setFuelAmount] = useState('');
    const [SuggestedPrice, setSuggestedPrice] = useState('');
    const [TotalAmountDue, setTotalAmountDue] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [error, setError] = useState('');
    const { username } = useParams();


    // useEffect(() => {
    //     Axios.get(`http://localhost:3000/quote/${username}`).then((response) => {
    //         const quote = response.data.result[0];
    //         setDeliveryAddress(quote.address);
    //         setCity(quote.city);
    //         setState(quote.state);
    //         setZipcode(quote.zipcode);
    //         setDeliveryDate(formatDate(quote.date));
    //         setFuelAmount(quote.gallonsRequested);
    //         setTotalAmountDue(quote.totalAmountDue);
    //     }).catch((error) => {
    //         console.log(error);
    //         setError(error);
    //     });
    // }, [username]);

    // changes to the fuel quote form before submitting?
    const handleChanges = (e) => {
        e.preventDefault();
        Axios.patch(`http://localhost:3000/quote/${username}`, {
            DeliveryAddress,
            city,
            state,
            zipcode,
            DeliveryDate,
            FuelAmount
        }).then((response) => {
            // response handling
        }).catch(error => {
            console.error(error);
            setError(error);
        });
    };

    // submit fuel quote form to the backend
    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            address: DeliveryAddress,
            city,
            state,
            zipcode,
            date: convertDateToSQLFormat(DeliveryDate),
            gallonsRequested: FuelAmount
        };
        Axios.post(`http://localhost:3000/quote/${username}`, postData).then((response) => {
            // response handling
        }).catch(error => {
            console.error(error);
            setError(error);
        });
    };
    return (
        <>
            <div className="fuel-quote-form">
                <div className="main-content">
                    <div className="container">
                        <h3>Fuel Quote Form</h3>
                        <form id="client-profile-form">
                            <div className="form-row">
                                <TextField
                                    label="Delivery Address"
                                    value={DeliveryAddress}
                                    fullWidth
                                    placeholder='1600 Pennsylvania Avenue'
                                    variant='filled'
                                    onChange={e => setDeliveryAddress(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <TextField
                                    label="City"
                                    value={city}
                                    placeholder='Houston'
                                    variant='filled'
                                    onChange={e => setCity(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="State"
                                    value={state}
                                    placeholder='TX'
                                    variant='filled'
                                    onChange={e => setState(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Zipcode"
                                    value={zipcode}
                                    placeholder='11554'
                                    variant='filled'
                                    onChange={e => setZipcode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='form-row'>
                                <TextField
                                    label="Delivery Date (MM/DD/YYYY)"
                                    value={DeliveryDate}
                                    style={{ width: '50%' }}
                                    placeholder='11/22/2222'
                                    variant='filled'
                                    onChange={e => setDeliveryDate(e.target.value)}
                                    required
                                />

                                <TextField
                                    label="Fuel Amount (Gallon)"
                                    value={FuelAmount}
                                    style={{ width: '50%' }}
                                    placeholder='450000'
                                    variant='filled'
                                    onChange={e => setFuelAmount(e.target.value)}
                                    required
                                />
                            </div>
                            {/* <div className="form-row">
                            <TextField
                                    label="Price Suggestion"
                                    value={SuggestedPrice}
                                    style={{ width: '100%'}}
                                    placeholder='$910,000'
                                    variant='filled'
                                    onChange={e => setSuggestedPrice(e.target.value)}
                                
                                />
                        </div> */}

                            <div className="suggestedPrice-container">
                                <p className="TotalOutput"> Suggested Price </p>
                                <p className="output-text-suggestion">$0</p>
                            </div>
                            {/* hardcoded values for now, for both suggested price and output */}
                            <div className="output-container">
                                <p className="TotalOutput"> Total Price: </p>
                                <p className="output-text">${TotalAmountDue}</p>
                            </div>
                            <div className="form-group button-container">
                                <Button onClick={handleChanges} className="save-btn" variant="contained" color="primary" style={{ borderRadius: 50 }}>
                                    Save
                                </Button>
                                <Button onClick={handleSubmit} className="submit-btn" variant="contained" color="primary" style={{ borderRadius: 50 }}>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default FuelQuoteForm
