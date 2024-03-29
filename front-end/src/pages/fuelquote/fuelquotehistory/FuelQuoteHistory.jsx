import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import {useParams} from "react-router-dom";
import './FuelQuoteHistory.scss'

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'DeliveryAddress', headerName: 'Delivery Address', width: 220 },
    { field: 'DeliveryDate', headerName: 'Delivery Date', width: 120 },
    {field: 'FuelAmount', headerName: 'Fuel Amount', type: 'number', width: 100},
    {field: 'TotalAmountDue', headerName: 'Total Amount Due', description: 'This column makes u broke brokie.', width: 180},
    {field: 'suggestedPricePerGallon', headerName: 'Suggested Price Per Gallon', width: 200},
];
const FuelQuoteHistory = () => {

    const { username } = useParams();
    const [rows, setRows] = useState([]);
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    useEffect(() => {
        Axios.get(`https://optifuel-forecast-server.vercel.app/quote/${username}`).then((response) => {
            const data = response.data.result;
            const mappedData = data.map(item => ({ ...item, id: item.idQuotes, DeliveryDate: formatDate(item.date), DeliveryAddress: item.address, FuelAmount: item.gallonsRequested, TotalAmountDue: item.totalAmountDue, suggestedPricePerGallon: item.suggestedPrice }));
            setRows(mappedData);
        });
    }, []);
    return (
        <div className="main-content">
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
    );
}

export default FuelQuoteHistory;
