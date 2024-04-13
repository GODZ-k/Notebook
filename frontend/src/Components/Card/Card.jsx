import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Add from "../Add/Add";
import { useNavigate } from "react-router-dom";

function Card({ data }) {
  const Navigate = useNavigate();

  const [editingText, setEditingText] = useState(null);

  const handleEdit = (book) => {
    setEditingText(book);
  };
  
  const handleFormSubmit = ()=>{
    setEditingText(null)
  }

  const accessToken = document.cookie
    ? document.cookie.split(" ")[0].split("=")[1].split(";")[0]
    : null;

  async function deleteNote(e) {
    try {
      await axios
        .post(
          "http://localhost:3000/api/v1/notes/delete",
          {
            id: e,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
        });
    } catch (error) {
      toast.error("error deleting note ");
    }
  }
  return (
    <>
     {editingText ? (<Add noteData={editingText} onSubmit={handleFormSubmit} />) : null}
      <div
        key={data._id}
        className=" w-[25%] h-auto border-gray-500 rounded-md m-2 border p-2 flex"
      >
        <div className="h-[100%] w-[70%]">
          <img
            src={data.image}
            alt=""
            className=" w-[100%] h-[100%] bg-cover bg-center rounded-sm"
          />
        </div>
        <div className=" ml-2">
          <div className=" text-gray-500 text-sm flex justify-between font-semibold">
            <p>{data.createdAt}</p>
          </div>
          <div>
            <p>{data.description}</p>
          </div>
          <div className="my-2">
            <button
              className="p-2 border mx-2 rounded-md bg-green-700 text-white px-6"
              onClick={() => handleEdit(data)}
            >
              Edit
            </button>
            <button
              className="p-2 border-2 mx-2 rounded-md text-red-600 px-5"
              onClick={() => deleteNote(data._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
