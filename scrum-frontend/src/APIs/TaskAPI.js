import axios from 'axios';

const baseURL = 'http://localhost:8000/tasks/'

const updateTaskColumn = async( taskID, newColumnID ) => {
    const res = await axios.patch(`${baseURL}${taskID}/`, { column: newColumnID });
    return res
}

const createTask = async( taskData )=> {
    const res = await axios(
        {
            method: 'post',
            url: baseURL,
            data: taskData
        }
    )
    return res
}

const editTask = async( taskData, tID )=> {
    const res = await axios(
        {
            method: 'patch',
            url: `${baseURL}${tID}/`,
            data: taskData
        }
    )
    return res
}

const getTaskById = async( taskID )=> {
    const res = await axios.get((`${baseURL}${taskID}/`));
    return res
}

export { updateTaskColumn, createTask, editTask }