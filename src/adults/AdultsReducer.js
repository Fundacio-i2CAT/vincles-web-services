// @flow
import {Map} from 'immutable';
import type {Adult, AdultId} from './AdultsTypes'
import type {AdultActions} from './AdultsActions'

type AdultState = Map<string, Adult>;

function removeAdult(state: AdultState, adultIdToBeRemoved: AdultId): AdultState {
    return state.delete(adultIdToBeRemoved);
}
function addAdult(state: AdultState, adultToBeAdded: Adult): AdultState {
    return state.set(adultToBeAdded.id, adultToBeAdded);
}
function updateAdult(state: AdultState, adultToBeUpdated: Adult): AdultState {
    return addAdult(state, adultToBeUpdated);
}

export function serialize(state:AdultState) {
    return state.toArray();
}
export function initAdultState(initialValues: Array<Object>= []): AdultState {
    const initialValuesAsObject: Object = initialValues.reduce(
        function(acc, cur) {
            acc[cur.id] = cur;
            return acc;
            },
        {});
    return Map (initialValuesAsObject);
}
export default function (state:AdultState = initAdultState() , action: AdultActions): AdultState {
    switch (action.type) {
        case 'ADD_ADULT':
            return addAdult(state, action.adult);
        case 'REMOVE_ADULT':
            return removeAdult(state, action.adultId);
        case 'UPDATE_ADULT':
            return updateAdult(state, action.adult);
        default:
            return state;
    }
}