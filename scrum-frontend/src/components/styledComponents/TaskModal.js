import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { editTask } from '../../APIs/TaskAPI';
import styled from 'styled-components';
import { Button, FormControl, InputLabel, Input, TextField, Select, MenuItem } from '@material-ui/core';
import { StyledInput } from '../styledComponents/Input';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MultipleSelect from '../styledComponents/MultiSelect'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const ModalWrapper = styled.div`
  position: relative;   
  /* background-color: #22303c; */
  color: #fff;
  height: 100%;
  width: 100%;
  /* background-color: red; */
  display: grid;
  place-content: center;
`;
const FormDiv = styled.div`
  position: relative;   
  display: flex;
  flex-direction: column;
  width: 100%;
  > * {
    margin: 0 0 1.5rem 0;
    padding: 5px 0 5px 0;
    width: 90% !important;
  }
`;

const ModalTopBar = styled.div`
  width: 100%;
  height: 59px;
  border-bottom: solid 1px #ccc;
  background-color: rgb(239, 239, 239, 0.3);
`;

const LockButtonSpan = styled.span`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  /* background-color: #fff; */
`;

const StyledIconButton = styled(IconButton)`
  transition: 0.2s ease-in-out;
  background-color: #fff;

&:hover {
  background: none;
  transform: scale(1.3);
  color: #fff;
}`;

const InnerButton = styled(IconButton)`
  margin: 0 .7rem 0 .7rem;
  transition: 0.3s ease-in-out;
  font-size: 30px !important;
  
  &:hover {
  transform: rotate(1turn);
  }
`;

const BottomButtons = styled.div`
  width: 100%;
  background-color: rgb(239,239,239,0.3);
  border-radius: 0 0 12px 12px;
  display: flex;
  justify-content: space-between;
  border-top: solid 1px #322f3d;
`;

const TaskModal =( props )=> {
  const { close, afterOpen, checkOpen, task, setOpenTask, setIsOpen, history }  = props;
  const [disabled, setDisabled] = useState( true );
  const [ taskName, setTaskName ] = useState( undefined );
  const [ description, setDescription] = useState( undefined );
  const [ taskPriority, setTaskPriority ] = useState ( undefined )
  const [ taskOwnwers, setTaskOwners ] = useState( undefined )
  const [ locked, setLocked ] = useState( true )



  const verbosePriorityNamesArray = [
    ["LO", "Low"],
    ["MD", "Medium"],
    ["HI", "High"],
    ["IM", "Immediate"]
   ]

  useEffect(() => {
    if (task) {
      setTaskName( task.task_name) 
      setDescription( task.description )
      setTaskPriority( task.priority )
    }
    return () => setDisabled( true );
  }, [ task ])

  const enableEditing =()=> {
    setDisabled(!disabled);
    setLocked(!locked)
  }

  const onSub = ( data )=> {
    data.preventDefault()
    const body = {
        "task_name": taskName,
        "description":  description,
        "priority":  taskPriority,
        "owners": taskOwnwers
    }
    editTask( body, task.id)
        .then((res) => {
            console.log(res)
        })
    close()
}

  const handleInputChange=(event)=> {
    const item = event.target
    switch (item.name) {
      case "title":
        setTaskName(item.value);
        break;
      case "description":
        setDescription(item.value)
        break;
      case "priority":
        setTaskPriority(item.value)
      default:
        return
    }
  }

  const priorityMapper =()=> {
    return verbosePriorityNamesArray.map((item) => <MenuItem value={item[0]}>{item[1]}</MenuItem>)
  }

    const renderForm =()=> {
      return (
        <>
        <LockButtonSpan>
        <StyledIconButton 
                onClick={ enableEditing } 
                aria-label="delete" 
                color="primary">
                    { locked ? <LockIcon fontSize="large" /> : <LockOpenIcon fontSize="large"/> }
          </StyledIconButton>
          </LockButtonSpan>
          <form onSubmit={ onSub } style={{postition: 'relative',  height: '600px', width: '400px'}} >
            <FormDiv >
            <InputLabel htmlFor="title">Title</InputLabel>
            
            <StyledInput 
                  id="title" 
                  name="title"  
                  disabled={disabled} 
                  value={ taskName } 
                  onChange={ handleInputChange } />
            <TextField 
                  name="description" 
                  label="Description" 
                  variant="outlined" 
                  disabled={disabled} 
                  value={ description } 
                  onChange={ handleInputChange } />
          <h3>Assignees:</h3>
          <MultipleSelect 
                disabled={ disabled } 
                color="primary" 
                task={ task } 
                setTaskOwners={ setTaskOwners } 
                id="owners" 
                name="owners"/>
          <h3>Priority:</h3>
          <Select 
                disabled={disabled} 
                id="priority" 
                name="priority" 
                value={ taskPriority } 
                onChange={ handleInputChange} 
                >
            { priorityMapper() }
          </Select>
          
          <BottomButtons>
          <InnerButton 
                type='submit'  
                variant="contained" 
                color="#fff"
                fontSize="medium">

          <SaveIcon /> 
          </InnerButton>

          <InnerButton 
            variant="contained"
            color="red"
            fontSize="large" 
            >
            <DeleteForeverIcon />
            </ InnerButton>

          </BottomButtons>
          </FormDiv>
        </form >
        </>
      )
    }
    return (
        <Modal
          isOpen={ checkOpen }
          onAfterOpen={ afterOpen }
          onRequestClose={ close }
          style={{
            overlay: {
              backgroundColor: 'rgba(33, 47, 59, 0.8)'
            },
            content: {
              top: '60px',
              left: '60px',
              right: '60px',
              bottom: '60px',
              border: '1px solid #ccc',
              background: 'rgb(84, 84, 84)',
              overflow: 'hidden',
              borderRadius: '20px',
              padding: '0px'
            }
          }}
        >
          
          <ModalTopBar>
                <IconButton onClick={ close } color="secondary"> < HighlightOffIcon fontSize="large" /></IconButton>
          </ModalTopBar>

          <ModalWrapper>
                { task ? renderForm() : <h1>"no task selected"</h1> }
          </ModalWrapper>

        </Modal>
    )
}

export default TaskModal;