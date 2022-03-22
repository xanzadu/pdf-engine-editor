import React, {useState} from 'react';
import axios from 'axios';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function FormEditor({output}) {
    const [values, setValues] = useState({
        firstName: '',
        lastName: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const handleFirstNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            firstName: event.target.value,
        }));
    };
    const handleLastNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            lastName: event.target.value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        axios.put('http://localhost:8080/update', values);
        console.log(output);
    };
    
    return(
        <div style={{float: 'left', width: '30%', fontSize: 40, textAlign: 'center', justifyContent: 'center', height: '100%'}}>
            Document Editor
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    id="first-name"
                    className="form-field"
                    type="text"
                    placeholder="Given Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleFirstNameInputChange}
                />

                <input
                    id="last-name"
                    className="form-field"
                    type="text"
                    placeholder="Family Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleLastNameInputChange}
                />
                <button className="form-field" type="submit">
                    Update Form
                </button>
            </form>
        </div>
    )
};