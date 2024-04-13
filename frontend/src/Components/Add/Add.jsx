import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Add({ noteData, onSubmit }) {
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);
  const [Loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  useEffect(() => {
    if (noteData) {
      setdescription(noteData.description);
    }
  }, [noteData]);

  // console.log("failed to load ", bookData);

  async function AddNote() {
    // const formData = new FormData();
    // formData.append("description", description);
    // formData.append("image", image);
    const accessToken = document.cookie
      .split(" ")[0]
      .split("=")[1]
      .split(";")[0];

    try {
      if (noteData) {
        await axios.patch(
          `http://localhost:3000/api/v1/notes/update/${noteData._id}`,
          {
            description: description,
            image: image,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,

            },
          }
        ).then((response)=>{
          setLoading(false);
          toast.success(response.data.message);
        })

      } else {
        await axios
          .post(
            "http://localhost:3000/api/v1/notes/create",
            {
              description: description,
              image: image,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(() => {
            toast.success("Note added successfully");
            setLoading(false);
          });
        }
      Navigate("/");
      onSubmit()

    } catch (error) {
      toast.error("error adding note");
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="description"
              value={description}
              required
              onChange={(e) => setdescription(e.target.value)}
              placeholder="Description"
              className="border-2 p-2 border-gray-600 rounded-md m-2"
            />
          </div>
          <div>
            <input
              type="file"
              //   required={!}
              name="image"
              onChange={(e) => setimage(e.target.files[0])}
              placeholder="Add Image"
              className=" border-gray-600 rounded-md m-2"
            />
          </div>
          <button
            className="border-2 border-gray-950 text-green-950 p-1 px-4 m-2"
            onClick={AddNote}
          >
             {Loading ? "Saving ..." : noteData ? "Update" : "Add Book"}
          </button>
        </form>
      </div>
    </>
  );
}

// export function onEdit(data){
// setdescription(data.description)
// setimage(data.image)

// }

export default Add;
