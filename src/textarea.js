import styled from 'styled-components';

const Textarea = styled.textarea`
  resize: vertical;
  width: 100%;
  box-sizing: border-box;
  -webkit-appearance: none;
  padding: 6px 8px;
  display: block;
  border-radius: 3px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
`;

export default Textarea;