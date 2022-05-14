import React, { useState } from "react";
import { createCard } from "../utils/api/index";
import CardForm from "./CardForm";
import { useParams } from "react-router-dom";

function AddCard() {
  const { deckId } = useParams();

  const initialReservation = {
    front: "Front side of card",
    back: "Back side of card",
    deckId: Number(deckId)
  };

  const [reservation, setReservation] = useState({ ...initialReservation });

  const handleSave = async (event) => {
    event.preventDefault();
    await createCard(reservation);
    setReservation(initialReservation);
  };

  return (
    <div>
      <CardForm formData={reservation} setFormData={setReservation} handleSave={handleSave} />
    </div>
  );
}
export default AddCard;
