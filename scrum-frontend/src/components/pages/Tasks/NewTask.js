import React, { useEffect, useState } from 'react';
import { createTask } from '../../../APIs/TaskAPI';
import { useForm } from 'react-hook-form';
import { getUsers } from '../../../APIs/UserAPI';


const NewTask=( props )=> {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [ userList, setUserList ] = useState([])

    const onSubmit = ( data )=> {
        const body = {
            "task_name": data.taskName,
            "description":  data.taskDescription,
            "column": props.match.params.columnID,
            "priority":  data.priority,
            "owners": data.owners
        }
        createTask( body )
            .then((res) => {
                console.log(res)
            })
            .then(props.history.push(`/board/${props.match.params.boardID}`))
    }

    useEffect(() => {
        getUsers()
            .then((apiResponse) => {
                console.log("New Task Refresh")
                setUserList(apiResponse)
            })
    }, [])

    const mapper =()=> {
        return userList.map((usr) => <option value={usr.id}>{usr.username}</option>)
    }

    return (
        <div>
            <h1> Add a new Task</h1>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <input type="text" placeholder="Task Name" {...register("taskName", { required: true })} />
                {errors.taskName && <p>Task name is required.</p>}
                <input type="text" placeholder="Task Description" {...register("taskDescription", { required: false })}/>
                <label htmlFor="priority">Priority</label>
                <select id="priority" name="priority" {...register("priority")}>
                    <option value="LO">Low</option>
                    <option value="MD">Medium</option>
                    <option value="HI">High</option>
                    <option value="IM">Immediate</option>
                </select>
                <label htmlFor="owners">Assign Task</label>
                <select multiple  id="owners" name="owners" {...register("owners", { required: false })}>
                { userList ? mapper() : undefined}
                </select>
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}



export default NewTask; 