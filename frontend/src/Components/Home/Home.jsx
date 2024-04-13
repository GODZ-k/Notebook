import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Card from "../Card/Card.jsx";

function Home() {
  const [notes, setNotes] = useState([]);
  const [progress, setProgress] = useState(0);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
  setInterval(() => {
    axios
    .get("http://localhost:3000/api/v1/notes")
    .then((response) => setNotes(response.data.data));
  }, 2000);
    setLoading(false);
    setProgress(100);
  }, []);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div></div>
      <div className="flex flex-wrap">
        {
          notes.length > 0 ?
          notes.map((data)=>( <Card data={data}/> )) : <p className="w-full text-center py-7">No data found</p>
        }
        
      </div>
    </>
  );
}

export default Home;
