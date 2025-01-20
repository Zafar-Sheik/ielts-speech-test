import React from "react";

const StudentList = ({ students, updateStudent, updateCallback }) => {
  //delete functionality

  const removeStudent = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete-student/${id}`,
        options
      );

      if (response.status === 200) {
        console.log("SUCCESS - Student Deleted");
        updateCallback();
      } else {
        console.error("Issue When Deleting Student");
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div>
      <h1>Students</h1>

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Actions Icon</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.fullName}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => updateStudent(student)}>
                  Update Icon
                </button>
                <button onClick={() => removeStudent(student.id)}>
                  Delete Icon
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
