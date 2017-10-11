//@flow
import React, {Component} from 'react';
import {LocalForm} from 'react-redux-form';
import {connect} from 'react-redux';
import {addRent} from './RentActions';
import RentFields from "./RentFields";
import type {Rent} from "./RentTypes";

type Props = {
    initialState:?Rent,
    addRent: Function
}
class RentAdder extends Component<Props> {
    handleSubmit(values) {
        this.props.addRent({...values});
    }

    render() {
        return (
            <div>
                <h1>Afegir informació sobre el lloguer del domicili habitual</h1>
                <LocalForm model="rent"
                           onChange={(values) => this.handleSubmit(values)}
                           initialState={this.props.initialState}
                >
                    <div>

                        <RentFields />
                    </div>
                </LocalForm>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        initialState: state.rent
    };
}

export default connect(mapStateToProps, {addRent})(RentAdder);
