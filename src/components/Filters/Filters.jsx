import { useState } from "react";
import "./filters.css";
import { useTodosContext } from "../../hooks/useTodosContext";

const Filters = () => {
  // const handleFilter = () => {
  //   e.preventDefault();
  // };

  const { dispatch } = useTodosContext();

  // const [taskStatusFilter, setTaskStatusFilter] = useState("all");

  const handleStatusFilter = (e) => {
    // console.log(e.target.value);
    dispatch({ type: "FILTER_TODO_BY_STATUS", payload: e.target.value });
  };

  const handlePrioityFilter = (e) => {
    // console.log(e.target.value);
    dispatch({ type: "FILTER_TODO_BY_PRIORITY", payload: e.target.value });
  };

  const handleDateFilter = (e) => {
    // console.log(e.target.value);
    dispatch({ type: "FILTER_TODO_BY_DATE", payload: e.target.value });
  };

  return (
    <div className="filters-container">
      <select className="filter" name="" id="" onChange={handleStatusFilter}>
        <option value="all">All Tasks</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <select className="filter" name="" id="" onChange={handlePrioityFilter}>
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select className="filter" name="" id="" onChange={handleDateFilter}>
        <option value="all">All Dates</option>
        <option value="overdue">Overdue</option>
        <option value="dueToday">Due Today</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </div>
  );
};

export default Filters;
