import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import PasteCard from "./PasteCard";

function PastesContainer() {
  let navigate = useNavigate();
  const [pastes, setpastes] = useState([]);

  useEffect(() => {
    axios
      .get("/paste/all")
      .then(function (response) {
        const arr = response.data;
        console.log(arr);
        setpastes([]);
        arr.map((a) => {
          setpastes((pastes) => [...pastes, a]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
      <p>all pastes</p>
      {pastes.length > 0 ? (
        <div>
          {pastes.map((p) => {
            return <PasteCard key={p._id} paste={p} />;
          })}
        </div>
      ) : (
        <p>no recent pastes</p>
      )}
    </Container>
  );
}

export default PastesContainer;
