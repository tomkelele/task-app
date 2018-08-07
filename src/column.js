import React from 'react';
import Task from './task';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import TextArea from './textarea.js';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
`;

const AddCard = styled.div`
  padding: 8px;
  transition: background 0.5s;
  &:hover {
    cursor: pointer;
    background: lightgrey;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const Action = styled.div`
  margin-top: 4px;
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  grid-gap: 4px;
  justify-items: start;
  justify-content: start;
  align-items: center;
`

const TitleInput = TextArea.extend`
  border: 1px solid lightgrey;
  background: transparent;
  box-shadow: none;
  resize: none;
  max-height: 162px;
  min-height: 54px;
  word-wrap: break-word;
  padding-left: 8px;
  padding-top: 8px;
  &:hover,
  &:focus {
    border: 1px solid lightgrey;
    box-shadow: none;
  }
`

export default class Column extends React.Component {
  state = {
    isAdding: false,
    title: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTask(this.state.title, this.props.column);
    this.setState({
      isAdding: false,
      title: ''
    })
  }

  handleChangeInput = event => {
    this.setState({
      title: event.target.value
    })
  }

  renderAddingForm() {
    if (this.state.isAdding) {
      return(
        <Form onSubmit={this.handleSubmit}>
          <TitleInput
            onChange={this.handleChangeInput}
          />
          <Action>
            <button>
              Add Card
            </button>
            <button onClick={() => {this.setState({isAdding: false})}}>
              Close
            </button>
          </Action>
        </Form>
      );
    } else {
      return(
        <AddCard onClick={() => {this.setState({isAdding: true})}}>
          + Add card
        </AddCard>
      );
    }
  }

  render() {
    return(
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <TaskList
              innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.tasks.map((task, index) => <Task key={task.id} index={index} task={task}/>)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
        {this.renderAddingForm()}
      </Container>
    );
  }
}