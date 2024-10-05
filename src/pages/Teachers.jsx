import React, { useEffect, useState } from "react";
import TableDisplay from "../components/Table/Table";
import Loading from "../components/Loaging/Loading";
import ModalWrapper from "../components/Modal/Modal";
import { Input, Select } from "antd";
import NoData from "../components/Empty/Empty";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    subjects,
    isTeacher:true
  });

  // Update student


  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/teachers`);
        const data = await response.json();
        setTimeout(() => {
          setTeachers(data);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeachers();
  }, [refreshPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      });
      setRefreshPage(!refreshPage);
      setShowModal(false);
      setNewTeacher({ name: "", age: "", email: "", address: "", subjects: [] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewTeacher({ name: "", age: "", email: "", address: "", subjects: [] });
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
    setNewTeacher((prevState) => ({
      ...prevState,
      subjects: value,
    }));
  };


  // Update user functions

  

  return (
    <div className="w-full">
      <div className="w-full flex justify-between my-5">
        <h1 className="text-sxl font-semibold">Teachers list</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#000]/20 px-4 rounded py-1 font-semibold active:bg-[#000]/30"
        >
          Add Teacher
        </button>
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : teachers.length > 0 ? (
          <TableDisplay
            data={teachers}
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
        title={"Add Teacher"}
        handleCancel={handleCancel}
      >
        <div>
          <form onSubmit={handleSubmit} className="p-2" autoComplete="off">
            <div className="mt-2">
              <label>Teacher Name:</label>
              <Input
                className="mt-2"
                allowClear
                type="text"
                name="name"
                value={newTeacher.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label>Teacher Age:</label>
              <Input
                className="mt-2"
                allowClear
                type="number"
                name="age"
                value={newTeacher.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label>Teacher Email:</label>
              <Input
                className="mt-2"
                allowClear
                type="email"
                name="email"
                value={newTeacher.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label>Teacher Address:</label>
              <Input
                className="mt-2"
                allowClear
                type="text"
                name="address"
                value={newTeacher.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label>Choose subject:</label>
              <Select
                className="mt-2 w-full"
                mode="tags"
                placeholder="Choose course"
                value={newTeacher.courses}
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

export default Teachers;
