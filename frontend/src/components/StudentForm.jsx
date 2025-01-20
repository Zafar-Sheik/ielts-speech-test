import React, { useState } from "react";

const StudentForm = ({ exisitingStudent = {}, updateCallBack }) => {
  const [fullName, setFullName] = useState(exisitingStudent.fullName || "");
  const [email, setEmail] = useState(exisitingStudent.email || "");

  const updating = Object.entries(exisitingStudent).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    //define the data
    const data = {
      fullName,
      email,
    };

    //define the req URL
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update-student/${exisitingStudent.id}` : "create-student");

    //set the req options
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    };

    //console.log(options);

    //send fetch request and await response
    const response = await fetch(url, options);
    console.log(response);
    //check response
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      //success
      updateCallBack;
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Full Name: </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div>
        <label>Email: </label>
        <input
          type="text"
          id="studentEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit">
        {updating ? "Update Student Details" : "Add New Student"}
      </button>
    </form>
  );
};

export default StudentForm;
