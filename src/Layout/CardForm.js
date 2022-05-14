import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";

function CardForm({ formData, setFormData, handleSave }) {
  const { deckId } = useParams();
  const deckUrl = `/decks/${deckId}`;
  const history = useHistory();

  const [deck, setDeck] = useState({});
  
  useEffect(() => {
    readDeck(deckId)
      .then(setDeck);
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  if (deck) {
    const handleDone = () => history.push(deckUrl);
    const add = !(formData.id);

    return (
      <div>
        <ul className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li><Link to={deckUrl}>{deck.name}</Link></li>
          {add ? <li>Add Card</li> : <li>Edit Card {formData.id}</li>}
        </ul>
        {add ? <h1>{deck.name}: Add Card</h1> : <h1>Edit Card</h1>}
        <form name="addCard">
          <table>
            <tbody>
              <tr><td><p>Front</p></td></tr>
              <tr><td>
                <textarea
                  name="front"
                  onChange={handleChange}
                  value={formData.front} />
              </td></tr>
              <tr><td><p>Back</p></td></tr>
              <tr><td>
                <textarea
                  name="back"
                  onChange={handleChange}
                  value={formData.back} />
              </td></tr>
              <tr>
                <td>
                  <button type="button" onClick={handleDone}>Done</button>
                </td>
                <td>
                  <button type="button" onClick={handleSave}>Save</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  return "Loading...";
}
export default CardForm;
