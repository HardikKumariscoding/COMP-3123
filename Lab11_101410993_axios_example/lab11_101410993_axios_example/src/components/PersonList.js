import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class PersonList extends Component {
    state = {
        persons: []
    };

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=10')
            .then(res => {
                const persons = res.data.results;
                this.setState({ persons });
            });
    }

    render() {
        return (
            <div className="container">
                <h1 className="mt-4 text-success">User List</h1>
                <div className="row">
                    {this.state.persons.map(person => (
                        <div key={person.login.uuid} className="col-md-6 mb-4">
                            <div className="card bg-primary text-white">
                                <div className="card-body">
                                    <img 
                                        src={person.picture.large} 
                                        alt={person.name.first} 
                                        className="rounded-circle mb-3"
                                    />
                                    <h5 className="card-title">{person.name.title} {person.name.first} {person.name.last}</h5>
                                    <p className="card-text"><strong>User Name:</strong> {person.login.username}</p>
                                    <p className="card-text"><strong>Gender:</strong> {person.gender.toUpperCase()}</p>
                                    <p className="card-text"><strong>Time Zone Description:</strong> {person.location.timezone.description}</p>
                                    <p className="card-text"><strong>Address:</strong> {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country} - {person.location.postcode}</p>
                                    <p className="card-text"><strong>Email:</strong> {person.email}</p>
                                    <p className="card-text"><strong>Birth Date and Age:</strong> {person.dob.date} ({person.dob.age})</p>
                                    <p className="card-text"><strong>Register Date:</strong> {person.registered.date}</p>
                                    <p className="card-text"><strong>Phone#:</strong> {person.phone}</p>
                                    <p className="card-text"><strong>Cell#:</strong> {person.cell}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default PersonList;
