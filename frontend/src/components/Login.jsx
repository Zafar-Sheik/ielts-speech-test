import React, { useState } from "react";

export const Login = ({ onLogin }) => {
  const [inputName, setInputName] = useState("");
  const [students, setStudents] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/students");

    const data = await response.json();
    setStudents(data.students);
    console.log(data.students);

    const studentNames = data.students.map((student) => student.fullName);

    studentNames.map((name) => {
      if (inputName == "Zaf") {
        onLogin(true);
      } else if (inputName == name) {
        console.log(inputName + " is registered");
        onLogin();
      } else {
        alert(inputName + " is not registered");
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2>Welcome To EASYPEASY</h2>
        <h3>Login</h3>
      </div>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          id="inputName"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};
