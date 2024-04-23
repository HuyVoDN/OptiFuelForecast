import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext.jsx';


export const SidebarData = () =>{
    const {authState} = useContext(AuthContext);
    const { username } = authState;

    return [
    
        {
            title:"My Profile",
            path:`/${username}/profile`,
            cName:'sidebar-text'
        },
        {
            title:"Fuel Quotes",
            // path:'./FuelQuoteForm.jsx',
            path: `/${username}/quote`,
            cName:'sidebar-text'
        },
        // {
        //     //dont think we'll need settings for now, dont touch the button
        //     title:"Settings",
        //     path:`/${username}/settings`,
        //     cName:'sidebar-text'
        // }
    
    ];
};