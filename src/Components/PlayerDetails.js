import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function PlayerDetails() {
  const [player, setPlayer] = useState({});

  let { id } = useParams();

  let navigate = useNavigate();


  const deletePlayer = () => {
    axios
      .delete(`${API}/players/${id}`)
      .then(
        () => navigate(`/players`),
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  useEffect(() => {
    axios
      .get(`${API}/players/${id}`)
      .then((response) => {
        console.log("Here's useEffect!!")
        console.log(response.data)
        setPlayer(response.data);
      })
      .catch((error) => {
        console.warn("catch", error);
        navigate("/not-found");
      });
  }, [id, navigate]);

  // Return JSX content for rendering
  return (
    <>
      {/* Display kick details */}
      <article className="container Player-Details">
        <h2>
          {/* Display a star icon if the kick is marked as a favorite */}
          {player.name}
        </h2>
        <h3>
          Number: {player.player_number}

        </h3>
        <h3>Year joined: {player.year_joined}</h3>
        <h3>
          <span>Position: </span>
          {player.position}
        </h3>
      </article>

      {/* Display navigation buttons */}
      <div className="showNavigation">
        <div>
          {/* Button to navigate back to the '/kicks' route */}
          <button>
            <Link to={`/players`}>Back</Link>
          </button>
        </div>

        <div>
          {/* Button to navigate to the 'edit' route for the current kick */}
          <button>
            <Link to={`/players/${id}/edit`}>Edit</Link>
          </button>
        </div>
        <div>
          {/* Button to delete the current kick */}
          <button onClick={deletePlayer}>Delete</button>
        </div>
      </div>
    </>
  );
}

// Export the KickDetails component
export default PlayerDetails;