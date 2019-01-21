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
    ],
    term: "",
    filter: "all"
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

  onSearchChange = term => {
    this.setState({ term });
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItem = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <Header toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItem}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
