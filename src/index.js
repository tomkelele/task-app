import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from './column';

import initialData from './initial-data';

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return
    }
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    if (start.id === finish.id) {
      const newTaskIds = start.taskIds;
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      }
      this.setState(newState);
      return;
    }

    const startTaskIds = start.taskIds;
    startTaskIds.splice(source.index, 1);
    const endTaskIds = finish.taskIds;
    endTaskIds.splice(destination.index, 0, draggableId);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }
    const newFinish = {
      ...finish,
      taskIds: endTaskIds
    }
    const newState = {
      ...this.state,
      columns : {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }

    this.setState(newState);
  }

  addTask = (task, column) => {
    const tasks = this.state.tasks;
    const newTaskIndex = Object.keys(tasks).length + 1;
    const newTasks = {
      ...tasks,
      ['task-' + newTaskIndex]: {
        id: 'task-' + newTaskIndex,
        content: task
      }
    }
    column.taskIds.push('task-' + newTaskIndex);
    const newState = {
      ...this.state,
      'columns' : {
        ...this.state.columns,
        [column.id]: column
      },
      'tasks': newTasks,
    }
    this.setState(newState);
  }

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const task = column.taskIds.map(taskId => this.state.tasks[taskId]);
            return (
              <Container>
                <Column key={column.id} column={column} tasks={task} addTask={this.addTask}/>
              </Container>
            );
          })}
        </Container>
      </DragDropContext>
      )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));