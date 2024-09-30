import { useDispatch } from "react-redux";
import { createAnecdote, newAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          dispatch(
            createAnecdote({
              content: e.target.anecdote.value,
              votes: 0,
            })
          );
          e.target.anecdote.value = "";
        }}
      >
        <div>
          <input
            name="anecdote"
            type="text"
            placeholder="Writing my new acectode..."
          />
        </div>
        <button type="sumbit">create</button>
      </form>
    </div>
  );
};
export default AnecdoteForm;
