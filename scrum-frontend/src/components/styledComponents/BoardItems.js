import styled from 'styled-components'

const StyledCard = styled.div`
  user-select: none;
  padding: 16px;
  margin: 0 0 8px 0;
  min-height: 50px;
  color: #fff;
  border-radius: 10px;
  background-color: #4b5d67;
`;

const StyledColumn = styled.div`
  padding: 5px;
  width: 250px;
  min-height: 500px;
  margin: 1rem;
  padding: 1rem;
  border-radius: 20px;
`;

const BoardWrapper = styled.div`
  /* display: flex; */
  /* justify-content: center; */
  
  position: relative;
  width: 100%;
  background-color: #424242;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
}

`;

const HeaderColumn = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

export { StyledCard, StyledColumn, BoardWrapper, HeaderColumn }