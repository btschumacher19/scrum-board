
const baseURL = 'http://localhost:8000/'

const getLoggedInUser = (token) => {
    return fetch(`${baseURL}board/current_user/?access_token=${token}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      }
    }).then(res => res)
  };


const getBoards =()=> {
  return fetch(`${baseURL}board`)
  .then((response) => response.json())
}

const getBoardByID =( boardID )=> {
  return fetch(`${baseURL}board/${ boardID }`)
    .then((response) => response.json())
}

const getUsers =()=> {
  return fetch(`${baseURL}users`)
    .then((response) => response.json())
}

export { getLoggedInUser, getBoardByID, getBoards, getUsers }