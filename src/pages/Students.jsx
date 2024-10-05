import React, { useEffect, useState } from "react";
import TableDisplay from "../components/Table/Table";
import Loading from "../components/Loaging/Loading";
import ModalWrapper from "../components/Modal/Modal";
import { Input, Select } from "antd";
import NoData from "../components/Empty/Empty";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [courses, setCourses] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    courses,
    isStudent:true
  });

  // Update student


  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/students`);
        const data = await response.json();
        setTimeout(() => {
          setStudents(data);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, [refreshPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });
      setRefreshPage(!refreshPage);
      setShowModal(false);
      setNewStudent({ name: "", age: "", email: "", address: "", courses: [] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewStudent({ name: "", age: "", email: "", address: "", courses: [] });
  };

  // Choose courses
  const options = [
    { value: "Maths", label: "Maths" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Biology", label: "Biology" },
  ];

  const handleChange = (value) => {
    setNewStudent((prevState) => ({
      ...prevState,
      courses: value,
    }));
  };


  // Update user functions

  

  return (
    <div className="w-full">
      <div className="w-full flex justify-between my-5">
        <h1 className="text-sxl font-semibold">Students list</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#000]/20 px-4 rounded py-1 font-semibold active:bg-[#000]/30"
        >
          Add Student
        </button>
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : students.length > 0 ? (
          <TableDisplay
            data={students}
            refreshPage={refreshPage}
            setRefreshPage={setRefreshPage}
          />
        ) : (
          <div className="w-full text-center">
            <NoData />
          </div>
        )}
      </div>
      <ModalWrapper
        open={showModal}
        setOpen={setShowModal}
        title={"Add Student"}
        handleCancel={handleCancel}
      >
        <div>
          <form onSubmit={handleSubmit} className="p-2" autoComplete="off">
            <div className="mt-2">
              <label>Student Name:</label>
              <Input
                className="mt-2"
                allowClear
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label>Student Age:</label>
              <Input
                className="mt-2"
                allowClear
                type="number"
                name="age"
                value={newStudent.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label>Student Email:</label>
              <Input
                className="mt-2"
                allowClear
                type="email"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label>Student Address:</label>
              <Input
                className="mt-2"
                allowClear
                type="text"
                name="address"
                value={newStudent.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label>Choose course:</label>
              <Select
                className="mt-2 w-full"
                mode="tags"
                placeholder="Choose course"
                value={newStudent.courses}
                onChange={handleChange}
                options={options}
              />
            </div>
            <div className="w-full flex items-center justify-end space-x-5 mt-5">
              <button
                type="button"
                className="text-[16px]"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#000]/20 active:bg-[#000]/30 px-2 rounded text-[16px]"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </ModalWrapper>

    </div>
  );
};

export default Students;
