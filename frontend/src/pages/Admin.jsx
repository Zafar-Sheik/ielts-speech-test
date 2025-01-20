import { useEffect, useState } from "react";
import "../App.css";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

function Admin() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); //pop up modal window used for create and update
  const [currentStudent, setCurrentStudent] = useState({});

  //As soon as component loads - call fetchStudents.
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await fetch("http://127.0.0.1:5000/students");
    const data = await response.json();
    setStudents(data.students);
    console.log(data.students);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStudent({});
  };

  const onUpdate = () => {
    closeModal();
    fetchStudents();
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    if (isModalOpen) return;
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  return (
    <>
      <StudentList
        students={students}
        updateCallback={onUpdate}
        updateStudent={openEditModal}
      />
      <button onClick={openCreateModal}>Add New Student</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <StudentForm
              updateCallback={onUpdate}
              exisitingStudent={currentStudent}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
