import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./features/student/studentSlice";

function Students() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();

  const { students, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading Members...</h2>;
  }
  if (error) {
    return <h2>Error:{error}</h2>;
  }

  const handleAdd = (e) => {
    e.preventDefault();

    const studentData = {
      name: name,
      email: email,
      department: department,
      age: age,
    };

    dispatch(addStudent(studentData));

    setName("");
    setEmail("");
    setDepartment("");
    setAge("");
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const studentData = {
      name: name,
      email: email,
      department: department,
      age: age,
    };

    dispatch(
      updateStudent({
        id: editId,
        studentData: studentData,
      }),
    );

    setName("");
    setEmail("");
    setDepartment("");
    setAge("");
    setEditId(null);
  };

  const handleEdit = (student) => {
    setEditId(student.id);

    setName(student.name);

    setEmail(student.email);

    setDepartment(student.department);
    setAge(student.age);
  };
  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };
  return (
    <div>
      <h1>Students</h1>
      <form onSubmit={editId ? handleUpdate : handleAdd}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>{" "}
      </form>
      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <p>{student.email}</p>
          <p>{student.department}</p>
          <p>{student.age}</p>
          <button onClick={() => handleEdit(student)}>Edit</button>

          <button onClick={() => handleDelete(student.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default Students;
