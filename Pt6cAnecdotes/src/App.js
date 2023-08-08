import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { vote, getAll } from "./requests";
import { NotificationContex } from "./notificationContex";
import { useContext } from "react";

const App = () => {
  const [notification, dispatchNotification] = useContext(NotificationContex);
  const queryClient = useQueryClient();
  const newAnecMutation = useMutation(vote, {
    onSuccess: (n) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map((el) =>
          el.id === n.data.id ? { ...n.data, votes: n.data.votes } : el
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    newAnecMutation.mutate(anecdote);
    dispatchNotification({ type: "ADD", payload: "you have voted" });
    setTimeout(() => dispatchNotification({ type: "REMOVE" }), 5000);
  };

  const result = useQuery("anecdotes", getAll);
  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return <div>Error loading the data</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
