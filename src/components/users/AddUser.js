import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

///ref shorter than state (if only reading the value)

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    const enteredNameRef = nameInputRef.current.value;
    const enteredAgeRef = ageInputRef.current.value;

    event.preventDefault();
    if (+enteredAgeRef < 1) {
      setError({
        title: "Invalid Age!",
        message: "Please enter a valid numeric age.",
      });
      return;
    }
    if (enteredNameRef.trim().length === 0) {
      setError({
        title: "Invalid input!",
        message: "Please enter a valid name.",
      });
      return;
    }
    props.onAddUser(enteredNameRef, enteredAgeRef);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef}></input>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" ref={ageInputRef}></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
