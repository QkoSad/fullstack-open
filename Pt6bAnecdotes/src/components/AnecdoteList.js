import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  return (
    <>
      <h2>Anecdotes</h2>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .filter((el) => el.content.toLowerCase().includes(filter.toLowerCase()))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  dispatch(vote(anecdote));
                  dispatch(
                    setNotification("you have clicked the vote button", 5)
                  );
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
export default AnecdoteList;
