import { useState } from "react";
import "./filters.css";
import { useTodosContext } from "../../hooks/useTodosContext";

const Filters = () => {
  const { dispatch } = useTodosContext();

  const handleStatusFilter = (e) => {
    // console.log(e.target.value);

    dispatch({ type: "SET_STATUS_FILTER", payload: e.target.value });
    dispatch({ type: "APPLY_FILTERS" }); // Apply filters after updating status
  };

  const handlePrioityFilter = (e) => {
    // console.log(e.target.value);
    dispatch({ type: "SET_PRIORITY_FILTER", payload: e.target.value });
    dispatch({ type: "APPLY_FILTERS" }); // Apply filters after updating status
  };

  const handleDateFilter = (e) => {
    // console.log(e.target.value);
    dispatch({ type: "SET_DUEDATE_FILTER", payload: e.target.value });
    dispatch({ type: "APPLY_FILTERS" }); // Apply filters after updating status
  };

  return (
    <div className="filters-container">
      <select className="filter" name="" id="" onChange={handleStatusFilter}>
        <option value="">All Tasks</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <select className="filter" name="" id="" onChange={handlePrioityFilter}>
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select className="filter" name="" id="" onChange={handleDateFilter}>
        <option value="">All Dates</option>
        <option value="overdue">Overdue</option>
        <option value="dueToday">Due Today</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </div>
  );
};

export default Filters;
