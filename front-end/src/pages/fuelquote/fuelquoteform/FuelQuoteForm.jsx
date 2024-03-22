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
            return Axios.get(`http://localhost:3000/quote/${username}`);
        }).then((response) => {

            let lastIndex = response.data.result.length - 1;
            setSuggestedPrice(response.data.result[lastIndex].suggestedPrice);
            setTotalAmountDue(response.data.result[lastIndex].totalAmountDue);
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
                            <div className="suggestedPrice-container">
                                <p className="TotalOutput"> Suggested Price </p>
                                <p className="output-text-suggestion">${SuggestedPrice}</p>
                            </div>
                            {/* hardcoded values for now, for both suggested price and output */}
                            <div className="output-container">
                                <p className="TotalOutput"> Total Price: </p>
                                <p className="output-text">${TotalAmountDue}</p>
                            </div>
                            <div className="form-group button-container">
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
