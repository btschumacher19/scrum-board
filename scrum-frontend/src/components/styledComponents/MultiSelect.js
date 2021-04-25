import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getUsers } from '../../APIs/UserAPI';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect( props ) {
  const { task } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [ personName, setPersonName ] = useState([]);
  const [ personID, setPersonID ] = useState([]);
  const [ allNames, setAllNames ] = useState([]);
  
  useEffect(() => {
    getUsers()
    .then((res) => {
      console.log(res)
      setAllNames( res )
    })
    setPersonID( task.owners )
    props.setTaskOwners( task.owners )
    let people = []
    for (let i = 0; i < task.non_field.length; i++) {
      people.push( task.non_field[i].username )
    }
    setPersonName( people )
  }, [ ])

  const handleChange = (event) => {
    setPersonName(event.target.value);

    let out = []
    for (let i = 0; i < event.target.value.length; i++) {
      for (let j = 0; j < allNames.length; j++) {
        if ( event.target.value[i] === allNames[j].username) {
          out.push(allNames[j].id)
        }
      }
    }
    setPersonID(out)
    props.setTaskOwners( out )
  };

  const mapper =( ) => {
    return ( 
     allNames.map((person, idx) => (
      <MenuItem key={ person.id } value={ person.username } style={getStyles(person.username, personName, theme)}>
      { person.username }
    </MenuItem>
       ))
    )
   }

  return (
    <>
        <Select
          label="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={ personName }
          onChange={ handleChange }
          input={<Input id="select-multiple-chip" />}
          disabled={ props.disabled }
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          { mapper() }
          
        </Select>
    </>
  );
}
