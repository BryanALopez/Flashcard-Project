import React, { useState, useEffect } from "react";
import { readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";
import { useParams } from "react-router-dom";

function EditCard() {
  const { deckId, cardId } = useParams();

  const initialReservation = {
    front: "Front side of card",
    back: "Back side of card",
    deckId: Number(deckId),
    id: cardId
  };

  const [reservation, setReservation] = useState({ ...initialReservation });

  useEffect(() => {
    readCard(cardId)
      .then(setReservation);
  }, [cardId]);

  const handleSave = async (event) => {
    event.preventDefault();
    await updateCard(reservation);
    // history.push(deckUrl);
  };

  return (
    <div>
      <CardForm formData={reservation} setFormData={setReservation} handleSave={handleSave} />
    </div>
  );
}
export default EditCard;
