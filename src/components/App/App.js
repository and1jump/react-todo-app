import React, { Component } from "react";

import Header from "../Header";
import SearchPanel from "../SearchPanel";
import TodoList from "../TodoList";
import ItemStatusFilter from "../ItemStatusFilter";
import ItemAddForm from "../ItemAddForm";

import "./index.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesom App"),
      this.createTodoItem("Have a lunch")
    ]
  };

  createTodoItem(label) {
    return { label, done: false, important: false, id: this.maxId++ };
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const indx = todoData.findIndex(el => el.id === id);

      // [a, b, c, d, e]
      // [a, b,    d, e]
      // const before = todoData.slice(0, indx);
      // const after = todoData.slice(indx + 1);

      const newArray = [
        ...todoData.slice(0, indx),
        ...todoData.slice(indx + 1)
      ];

      return { todoData: newArray };
    });
  };

  addItem = text => {
    const newItem = this.createTodoItem(text);

    // add element in array

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return { todoData: newArr };
    });
  };

  toggleProperty(arr, id, propName) {
    const indx = arr.findIndex(el => el.id === id);

    // 1. update object
    const oldItem = arr[indx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    // 2. constract new Array
    return [...arr.slice(0, indx), newItem, ...arr.slice(indx + 1)];
  }

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "done") };
    });
  };

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "important") };
    });
  };

  render() {
    const { todoData } = this.state;

    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <Header toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
