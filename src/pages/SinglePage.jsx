import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loaging/Loading";
import { LeftCircleOutlined } from "@ant-design/icons";

const SinglePage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isStudent = window.location.pathname.includes("/students/");
    const result = isStudent
      ? `http://localhost:3000/students/${id}`
      : `http://localhost:3000/teachers/${id}`;
    fetch(result)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setData(data);
          setLoading(false);
        }, 500);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div>
      <button onClick={() => navigate(-1)}>
        <LeftCircleOutlined className="text-[30px]" />
      </button>
      <div className="flex items-start space-x-10 mt-10">
        {/* <div>
            <img className="w-[300px] h-[300px] rounded" src={data.image} alt={data.name} width={300} height={300} />
        </div> */}
        <div className="bg-[#F5F5F7] rounded-lg py-11 px-8">
          <h1>{data.name}</h1>
          <p>Age: {data.age}</p>
          <p>Email: {data.email}</p>
          <p>Address: {data.address}</p>
          <p>Courses: {data.isTeacher ? data.subjects.join(", ") : data.courses.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
