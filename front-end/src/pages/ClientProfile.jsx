import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import './ClientProfile.scss';
class ClientProfile extends React.Component {
    render() {
        return (
            <>
            <Sidebar />
            <div className="container">
                <h1>My Profile</h1>
                <form id="client-profile-form">
                    <div className="form-group">
                        <label htmlFor="first-name">First Name:</label>
                        <input type="text" id="first-name" name="first-name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">Last Name:</label>
                        <input type="text" id="last-name" name="last-name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input type="text" id="state" name="state" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zipcode">Zipcode:</label>
                        <input type="text" id="zipcode" name="zipcode" required />
                    </div>
                    <div className="button">
                        <button>Save</button>
                    </div>
                </form>
            </div>
            </>
        );
    }
}

export default ClientProfile;
