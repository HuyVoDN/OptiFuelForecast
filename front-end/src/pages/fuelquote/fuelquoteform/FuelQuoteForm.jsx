import React, {useState} from "react";
import { TextField, Button, Typography } from '@mui/material';
import "./FuelQuoteForm.scss";

const FuelQuoteForm = () => {
    const [DeliveryAddress, setDeliveryAddress] = useState('');
    const [DeliveryDate, setDeliveryDate] = useState('');
    const [FuelAmount, setFuelAmount] = useState('');
    const [SuggestedPrice, setSuggestedPrice] = useState('');  
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    // const[ id, lastName, firstName, age ] = useState('');

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
                            <p className="output-text-suggestion">$1,000,000</p>
                        </div>
                        {/* hardcoded values for now, for both suggested price and output */}
                        <div className="output-container">
                            <p className="TotalOutput"> Total Price: </p>
                            <p className="output-text">$100,000,000</p>
                        </div>
                        <div className="form-group button-container">
                            <Button className="save-btn" variant="contained" color="primary" style={{ borderRadius: 50 }}>
                                Save
                            </Button>
                            <Button className="submit-btn" variant="contained" color="primary" style={{ borderRadius: 50 }}>
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
