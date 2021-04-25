import React, { useState, useEffect } from 'react';
import { getTaskById } from '../../../APIs/TaskAPI';
import Modal from 'react-modal';
import TaskModal from '../../styledComponents/TaskModal';



const TaskDetail =( props )=> {
    var subtitle;
    const [modalIsOpen,setIsOpen] = useState(false);

    Modal.setAppElement('#root');    

    const openModal =()=> {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
    console.log('Model Opened')
    }
  
    function closeModal(){
      setIsOpen(false);
    }

    return (
      <>
            <TaskModal 
            close={ closeModal } 
            afterOpen={ afterOpenModal } 
            open={ openModal }
            checkOpen={ modalIsOpen  } />
            </>
    )
}

export default TaskDetail 