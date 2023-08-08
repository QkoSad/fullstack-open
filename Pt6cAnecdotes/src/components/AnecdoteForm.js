import { createAnec } from "../requests";
import { useQueryClient, useMutation } from "react-query";
import { NotificationContex } from "../notificationContex";
import { useContext } from "react";

const AnecdoteForm = () => {
  const [notification, dispatchNotification] = useContext(NotificationContex);
  const queryClient = useQueryClient();
  const newAnecMutation = useMutation(createAnec, {
    onSuccess: (n) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(n));
    },
    onError: (err) => {
      dispatchNotification({ type: "ADD", payload: "too short" });
      setTimeout(() => dispatchNotification({ type: "REMOVE" }), 5000);
    },
  });
  const id = () => Math.random() * 1000;
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecMutation.mutate({ content, id: id(), votes: 0 });
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
