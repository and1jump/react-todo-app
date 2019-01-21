import React, { Component } from "react";

import "./list-item.css";

export default class TodoListItem extends Component {
  constructor() {
    super();

    this.onLabelClick = this.onLabelClick.bind(this);
    this.onMarkImportant = this.onMarkImportant.bind(this);
  }

  onLabelClick() {
    this.setState(({ done }) => {
      return {
        done: !done
      };
    });
  }

  onMarkImportant() {
    this.setState(state => {
      return {
        important: !state.important
      };
    });
  }

  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      done,
      important
    } = this.props;

    let className = "todo-list-item";
    if (done) {
      className += " done";
    }

    if (important) {
      className += " important";
    }

    return (
      <span className={className}>
        <span onClick={onToggleDone} className="todo-list-item-label">
          {label}
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}
