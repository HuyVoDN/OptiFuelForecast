import FuelQuoteForm from "./fuelquoteform/FuelQuoteForm";
import FuelQuoteHistory from "./fuelquotehistory/FuelQuoteHistory";
import Sidebar from "../../components/sidebar/Sidebar";
import './FuelQuote.scss'
import { useState } from "react";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Box from "@mui/material/Box"; 
import Tab from '@mui/material/Tab';


const FuelQuote = () => {

    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
        <div className="nav-fuel-container">
            <Sidebar/>
            <div className="fuel-quote-container">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Fuel Quote Form" value="1" sx={{fontWeight: 'bold', fontSize: 'large'}}/>
                        <Tab label="Fuel Quote History" value="2" sx={{fontWeight: 'bold', fontSize: 'large'}}/>
                    </TabList>
                    </Box>
                    <TabPanel value="1" sx={{paddingInline: '0', paddingBlock: '10px'}}>
                        <FuelQuoteForm/>
                    </TabPanel>
                    <TabPanel value="2" sx={{paddingInline: '0', paddingBlock: '10px'}}>
                        <FuelQuoteHistory />
                    </TabPanel>
                </TabContext>
            </div>
        </div>
        
        </>
    );
}

export default FuelQuote;