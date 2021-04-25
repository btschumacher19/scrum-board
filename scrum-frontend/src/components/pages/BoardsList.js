import React, { Component } from 'react'
import LoadBoards from '../LoadBoards';
import { getBoards } from '../../APIs/UserAPI'

class BoardsList extends Component {
  state = {
    boards: []
  }

  componentDidMount(){
    getBoards()
      .then((apiResponseJSON) => {
          console.log(apiResponseJSON)
        this.setState({
          boards: apiResponseJSON
        })
      }
    )
  }

  render() {
    return (
      <div style={{textAlign: 'center', padding: '20px'}}>
        <h1> All Boards </h1>
        <LoadBoards b={this.state.boards} />
      </div>
    )
  }
}

export default BoardsList