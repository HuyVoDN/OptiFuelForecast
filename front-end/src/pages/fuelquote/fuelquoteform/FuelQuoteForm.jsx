import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { TextField, Button, FormControl, MenuItem, Select, InputLabel, Snackbar } from '@mui/material';
import "./FuelQuoteForm.scss";
import { STATES } from '../../../constants/stateOptions.js';

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
    const isFormIncomplete = !DeliveryAddress || !DeliveryDate || !FuelAmount || !city || !state || !zipcode;
    const[showPopup, setShowPopup] = useState(false);
    // submit fuel quote form to the backend
    const handleSuggestion = (e) => {
        e.preventDefault();
        const postData = {
            address: DeliveryAddress,
            city,
            state,
            zipcode,
            date: convertDateToSQLFormat(DeliveryDate),
            gallonsRequested: FuelAmount
        };
        Axios.post(`${import.meta.env.VITE_SERVER_URL}/quote/${username}/calculate`, postData).then((response) => {
            // response handling
            setSuggestedPrice(response.data.suggestedPricePerGallon);
            setTotalAmountDue(response.data.totalAmountDue);
            
        }).catch(error => {
            console.error(error);
            setError(error);
        });
       
    };
    const handleNewForm = (e) => {
        e.preventDefault();
        const postData = {
            address: DeliveryAddress,
            city,
            state,
            zipcode,
            date: convertDateToSQLFormat(DeliveryDate),
            gallonsRequested: FuelAmount,
            suggestedPrice: SuggestedPrice,
            totalAmountDue: TotalAmountDue
        };
        Axios.post(`${import.meta.env.VITE_SERVER_URL}/quote/${username}`, postData).then((response) => {
            // response handling
            return Axios.get(`${import.meta.env.VITE_SERVER_URL}/quote/${username}`);
        }).then((response) => {

            let lastIndex = response.data.result.length - 1;
            setSuggestedPrice(response.data.result[lastIndex].suggestedPrice);
            setTotalAmountDue(response.data.result[lastIndex].totalAmountDue);
            console.log(`New Fuel Quote for ${username} has been created successfully!`);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);

        }).catch(error => {
            console.error(error);
            setError(error);
        });
       
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setShowPopup(false);
      };
     
    
    return (
        <>
            <div className="fuel-quote-form">
                <div className="main-content">
                <Snackbar
        open={showPopup}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
        message="You have successfully added a new fuel quote!"
        ContentProps={{
            style: {fontSize: '17px', backgroundColor: 'rgb(0, 0, 112)', fontFamily:'Segoe UI', fontWeight: 'bold', height: '60px', textAlign: 'center', borderRadius: '10px'} 
        }}
       
      />

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
                               <FormControl required variant="filled" sx={{ minWidth: 200 }} >
                                <InputLabel id="state-label">State</InputLabel>
                                <Select
                                    labelId="state-label"
                                    value={state}
                                    onChange={e => setState(e.target.value)}
                                >
                                {STATES.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
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
                                <p className="TotalOutput"> Calculated Price </p>
                                <p className="output-text-suggestion">${SuggestedPrice}</p>
                            </div>
                            {/* hardcoded values for now, for both suggested price and output */}
                            <div className="output-container">
                                <p className="TotalOutput"> Total Price: </p>
                                <p className="output-text">${TotalAmountDue}</p>
                            </div>
                            <div className="form-group button-container">
                                <Button 
                                    onClick={handleSuggestion} 
                                    className="submit-btn" 
                                    variant="contained" 
                                    color="primary" 
                                    style={{ borderRadius: 50 }}
                                    disabled={isFormIncomplete}
                                >
                                    Calculate 
                                </Button>

                                <Button 
                                onClick={handleNewForm}
                                className="submit-btn" 
                                variant="contained" 
                                color="primary" 
                                style={{ borderRadius: 50 }}
                                disabled={isFormIncomplete}
                                >
                                    Add
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
