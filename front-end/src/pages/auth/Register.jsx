import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import "./Register.scss";

function SignUpForm() {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address:'',
        zipcode:'',
        state:'',
    });

    const stateOptions = [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'TX', label: 'Texas' },
    ];

    const handleInputChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleStateChange = (selectedOption) => {
        setFormState({
          ...formState,
          state: selectedOption.value,
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        // form submit logic here, will implement later
        console.log(formState);
    };

    return (
        <div className="register">
            <form onSubmit={handleSubmit} className='signup-form'>
            <h1>Sign Up</h1>
                    <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder='Email*'
                    />
                
                    <input
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleInputChange}
                        placeholder='Password*'
                    />
                <div className='name-container'>
                    <input
                        type="text"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleInputChange}
                        placeholder='First Name*'
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleInputChange}
                        placeholder='Last Name*'
                    />
                    </div>
                    <div className='location-container'>
                    <input
                        type="text"
                        name="address"
                        value={formState.address}
                        onChange={handleInputChange}
                        placeholder='Address*'
                    />
                    <input
                        type="number"
                        name="zipcode"
                        value={formState.zipcode}
                        onChange={handleInputChange}
                        placeholder='Zipcode*'
                    />
                    </div>
                    <Select
                        options ={stateOptions}
                        onChange={handleStateChange}
                        placeholder='State*'
                    />
                <button type="submit">Sign Up</button>
                <span>Already have an account? <Link to="/login">Log in here</Link></span>
            </form>
           
        </div>
    );
}

export default SignUpForm;