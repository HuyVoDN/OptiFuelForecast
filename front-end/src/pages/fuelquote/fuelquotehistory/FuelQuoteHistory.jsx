import { DataGrid } from '@mui/x-data-grid';
import './FuelQuoteHistory.scss'

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

const FuelQuoteHistory = () => {

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
