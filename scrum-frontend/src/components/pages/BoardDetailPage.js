import React, { useState, useEffect } from 'react'
import { getBoardByID } from '../../APIs/UserAPI'
import { updateTaskColumn } from '../../APIs/TaskAPI'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { StyledCard, StyledColumn, BoardWrapper, HeaderColumn } from '../styledComponents/BoardItems'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Modal from 'react-modal';
import TaskModal from '../styledComponents/TaskModal';
import { IconButton } from '@material-ui/core'
import sendAlert from '../../axios/SlackAPI'


const onDragEnd = (result, columns, setColumns) => {
  const { source, destination, draggableId } = result;
  if (!destination) return;

  if (
    destination.droppableId === source.droppableId && destination.index === source.index
  ) return;

  let sourceColNumber = -1
  let destColNumber = -1
  // get column by id (in this case it's the uuid above)
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].column_title === source.droppableId) {
      sourceColNumber = i
    } if (columns[i].column_title === destination.droppableId) {
      destColNumber = i
    }
  }
  const sourceColumn = columns[sourceColNumber]
  const destColumn = columns[destColNumber]

  let task = {}
  for (let i = 0; i < sourceColumn.tasks.length; i++) {
    if (sourceColumn.tasks[i].task_name === draggableId) {
      task = sourceColumn.tasks[i]
    }
  }

  const newSourceTaskArr = Array.from(sourceColumn.tasks)
  const newDestTaskArr = Array.from(destColumn.tasks)

  if (sourceColumn !== destColumn) {

    newSourceTaskArr.splice(source.index, 1);
    newDestTaskArr.splice(destination.index, 0, task)
    //I wante sourceColumn.tasks to equal newTaskArr

    const newSourceColumn = {
      ...sourceColumn,
      'tasks': newSourceTaskArr
    };

    const newDestColumn = {
      ...destColumn,
      'tasks': newDestTaskArr
    }


    const newColumnState = []

    for (let i = 0; i < columns.length; i++) {
      if (columns[i]['id'] === newSourceColumn.id) {
        newColumnState.push(newSourceColumn)
      } else if (columns[i]['id'] === newDestColumn.id) {
        newColumnState.push(newDestColumn)
      } else {
        newColumnState.push(columns[i])
      }
    }
    // taskID, newColumnID
    updateTaskColumn(task.id, newDestColumn.id)
    // updateBoard(task.id, newDestColumn.id)
    setColumns(newColumnState)
    const data = {
      "text": `Task "${task.task_name}" has moved to the ${newDestColumn.column_title} column!`
    }
    sendAlert( data)

  } else {
    newSourceTaskArr.splice(source.index, 1);
    newSourceTaskArr.splice(destination.index, 0, task)

    const newSourceColumn = {
      ...sourceColumn,
      'tasks': newSourceTaskArr
    };

    const newColumnState = []
    for (let i = 0; i < columns.length; i++) {
      if (columns[i]['id'] === newSourceColumn.id) {
        newColumnState.push(newSourceColumn)
      } else {
        newColumnState.push(columns[i])
      }
    }
    setColumns(newColumnState)
  }
}


const BoardPage = (props) => {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [addID, setAddID] = useState(undefined)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [openTask, setOpenTask] =useState({})

Modal.setAppElement('#root');  

  useEffect(() => {
    const boardID = props.match.params.boardID;
    getBoardByID(boardID)
      .then((b) => {
        setBoard({
          'id': boardID,
          'board_title': b.board_title
        })
        setColumns(b.columns)
        setAddID(b.columns[0].id)
      })
  }, [modalIsOpen, props])

  const openModal =( task )=> {
    setOpenTask( task )
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
    setOpenTask(undefined)
  }

  return (
    <>

      <Link to={`/board/${board.id}/${addID}/task/new`}> <IconButton type="button"><LibraryAddIcon /></IconButton></Link>
    <TaskModal 
    close={ closeModal } 
    checkOpen={ modalIsOpen  } 
    task={ openTask }
    />
      
      <BoardWrapper >
        <DragDropContext onDragEnd={e => onDragEnd(e, columns, setColumns)}>
          {columns.map((col, id1) => {
            return (
              <HeaderColumn>
                <h2 style={{ textAlign: 'center' }}>{col.column_title}</h2>
                <Droppable droppableId={col.column_title} key={id1}>
                  {(provided, snapshot) => {
                    return (
                      // <BoardColumn provided={ provided } snapshot={ snapshot }>
                      <StyledColumn
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ background: snapshot.isDraggingOver ? '#abc5d4' : 'lightgrey' }}>
                        {col.tasks.map((task, index) => {
                          return (
                            <Draggable key={task.id} draggableId={task.task_name} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <StyledCard  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{backgroundColor: snapshot.isDragging ? '#322f3d' : '#4b5d67', ...provided.draggableProps.style}
                                } onClick={() => {openModal( task )}}
                                 >
                                   <div style={{ cursor: "auto"}}>
                                   {task.task_name}
                                   </div>
                                  </StyledCard>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </StyledColumn>
                      // {/* </BoardColumn> */}
                    )
                  }}
                </Droppable>
              </HeaderColumn>
            )
          })}

        </DragDropContext>
      </BoardWrapper>
    </>
  )
}

export default BoardPage