import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 600px;
  min-height: 600px;
  background: rgba( 255, 255, 255, 0.50 );
  box-shadow: 0 8px 32px 0 rgba( 8, 10, 10, 0.37 );
  backdrop-filter: blur( 10.5px );
  -webkit-backdrop-filter: blur( 10.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
`;

const Outer = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
`;

export {Outer, Wrapper}