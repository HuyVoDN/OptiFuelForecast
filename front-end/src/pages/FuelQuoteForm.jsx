import React, {useState} from "react";
import { TextField, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import "./FuelQuoteForm.scss";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import NavBar from "../components/navbar/Navbar.jsx";

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'DeliveryAddress', headerName: 'Delivery Address', width: 220 },
    { field: 'DeliveryDate', headerName: 'Delivery Date', width: 120 },
    {field: 'FuelAmount', headerName: 'Fuel Amount', type: 'number', width: 100},
    {field: 'TotalAmountDue', headerName: 'Total Amount Due', description: 'This column makes u broke brokie.', width: 180},
  ];

const rows = [
    { id: 1, DeliveryAddress: '1600 Pennsylvania Avenue', DeliveryDate: '11/22/2222',FuelAmount: 3500, TotalAmountDue: '1,000,000' },
    { id: 2, DeliveryAddress: '1600 Pennsylvania Avenue', DeliveryDate: '11/22/2222',FuelAmount: 3500, TotalAmountDue: '1,000,000' },
    { id: 3, DeliveryAddress: '1600 Pennsylvania Avenue', DeliveryDate: '11/22/2222',FuelAmount: 3500, TotalAmountDue: '1,000,000' },
    { id: 4, DeliveryAddress: '1600 Pennsylvania Avenue', DeliveryDate: '11/22/2222',FuelAmount: 3500, TotalAmountDue: '1,000,000' },
    { id: 5, DeliveryAddress: '1600 Pennsylvania Avenue', DeliveryDate: '11/22/2222',FuelAmount: 3500, TotalAmountDue: '1,000,000' },
    { id: 6, DeliveryAddress: '1600 Pennsylvania Avenue', DeliveryDate: '11/22/2222',FuelAmount: 3500, TotalAmountDue: '1,000,000' },
];
const Quote = () => {
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
                <Sidebar />
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
                        <div className="form-row">
                            <TextField
                                    label="Price Suggestion"
                                    value={SuggestedPrice}
                                    style={{ width: '100%' }}
                                    placeholder='$910,000'
                                    variant='filled'
                                    onChange={e => setSuggestedPrice(e.target.value)}
                                    required
                                />
                        </div>
                        <div className="output-container">
                            <p className="TotalOutput"> Total Price: </p>
                            <p className="output-text">$1,000,000</p>
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


            <div className="main-content">
                <Sidebar />
                <div className="container">
                    <h3>Fuel Quote History</h3>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default Quote
