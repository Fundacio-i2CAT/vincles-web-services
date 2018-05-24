//@flow
import React, {Component} from "react";
import type {Person} from "./PersonTypes";
import {Trans, translate} from "react-i18next";
import {Avatar, Card, Divider, Grid, List, ListItem, ListItemText} from 'material-ui';
import {create} from '../shared/UUID';

type Props = {
  persons: Array<Person>,
  onRemoveClick: Function,
  onUpdateClick: Function,
  onAddPersonClick: Function,
  expectedNumberOfPersons: number,
  classes: Object
};

const initials = (name: string) => {
  const initials = name.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
  if (initials instanceof Array) {
    return initials.map(char => char.toUpperCase()).join('');
  } else {
    return "?";
  }
};

const repeat = (times: number, callback: Function) => {
  if (typeof callback !== "function") {
    throw new TypeError("Callback is not a function");
  }
  let response = [];
  for (let i = 0; i < times; i++) {
    response.push(callback(i));
  }
  return response;
};

type PersonCardProps = {
  person: Person,
  updatePerson: Function,
  removePerson: Function
}
const relacioDeParentiuATextDelLListatDePersones = (relacioDeParentiu: string) => {
  const textos = {
    parella: 'és la seva parella',
    fill: 'és el seu fill/a',
    fillastre: 'és el seu fillastre/a',
    infant_acollit: 'és un infant acollit',
    pare: 'és el seu pare',
    avi: 'és el seu avi/a',
    sogre: 'és el seu sogre/a',
    germa: 'és el seu germà/na',
    cunyat: 'és el seu cunyat/da',
    gendre: 'és el su gendre/jove',
    altres: 'és un familiar',
    cap: 'és una persona que conviu amb vosté',
    undefined: ''
  };
  return textos[relacioDeParentiu];
};


const PersonCard = (props: PersonCardProps) => (
    <ListItem button onClick={() => props.updatePerson(props.person.id)}>
      <Avatar style={{backgroundColor: "#006600"}}>{initials(props.person.nom)}</Avatar>
      <ListItemText
          primary={props.person.is_the_user_in_front_of_the_computer ? `Vosté: ${props.person.nom}` : props.person.nom}
          secondary={props.person.is_the_user_in_front_of_the_computer ? '' : `${props.person.edat} anys ${relacioDeParentiuATextDelLListatDePersones(props.person.relacio_parentiu)}`}
      />
    </ListItem>
);

type UnknownPersonProps = {
  onAddPersonClick: Function,
  personNumber: number
}
const UnknownPersonCard = (props: UnknownPersonProps) => (
    <ListItem button onClick={() => props.onAddPersonClick()}>
      <Avatar>?</Avatar>
      <ListItemText
          primary={`Persona ${(props.personNumber + 1).toString()} - Premi aquí per a introduir la informació d'aquesta persona`}/>
    </ListItem>
);

class PersonsViewer extends Component<Props, void> {
  render() {
    const missingPersons = this.props.expectedNumberOfPersons - this.props.persons.length;
    return (
        <Grid container className="container-family">
          <Grid item sm={12} xs={12} className="bg-family">
            <h1>
              <Trans>Persones de la unitat de convivència</Trans>
            </h1>
            <Grid container className="PersonsViewerPage">
              <Grid item xs={12}>
                <Card>
                  <List component="nav">
                    {[...this.props.persons.map(person =>
                        <PersonCard
                            key={person.id}
                            person={person}
                            removePerson={this.props.onRemoveClick}
                            updatePerson={this.props.onUpdateClick}/>
                    ),
                      ...repeat(missingPersons,
                          (i) => <UnknownPersonCard key={i} personNumber={i}
                                                    onAddPersonClick={this.props.onAddPersonClick}/>)]
                        .reduce((arr, current) => [...arr, current, <Divider key={create()}/>], []).slice(0, -1)}
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    );
  }
}

export default translate("translations")(PersonsViewer);
