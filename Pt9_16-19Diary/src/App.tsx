import { useEffect, useState } from "react";
import axios from "axios";

interface Diary {
  date: string;
  visibility: string;
  weather: string;
  id: number;
  comment: string;
}

function App() {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const addDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newDiaryEntry: Diary = {
      date,
      visibility,
      weather,
      id: diaries.length,
      comment,
    };
    try {
      const resp = await axios.post<Diary>(
        "http://localhost:3003/api/diaries",
        newDiaryEntry
      );
      setDiaries([...diaries, resp.data]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        window.alert(error.response?.data);
      } else {
        console.error(error);
      }
    }
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };
  const [diaries, setDiaries] = useState<Omit<Diary, "comment">[]>([]);
  useEffect(() => {
    axios
      .get<Omit<Diary, "comment">[]>("http://localhost:3003/api/diaries")
      .then((resp) => setDiaries(resp.data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <>
      <div>
        <h3>add diary</h3>
        <form onSubmit={addDiary}>
          <div>
            date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label>visibility: </label>
            <label>
              great
              <input
                value={visibility}
                type="radio"
                onChange={() => setVisibility("great")}
                name="visibility"
              />
            </label>
            <label>
              good
              <input
                value={visibility}
                type="radio"
                onChange={() => setVisibility("good")}
                name="visibility"
              />
            </label>
            <label>
              ok
              <input
                value={visibility}
                type="radio"
                onChange={() => setVisibility("ok")}
                name="visibility"
              />
            </label>
            <label>
              poor
              <input
                value={visibility}
                type="radio"
                onChange={() => setVisibility("poor")}
                name="visibility"
              />
            </label>
          </div>
          <div>
            <label>weather: </label>
            <label>
              sunny
              <input
                value={weather}
                onChange={() => setWeather("sunny")}
                type="radio"
                name="weather"
              />
            </label>
            <label>
              rainy
              <input
                value={weather}
                onChange={() => setWeather("rainy")}
                type="radio"
                name="weather"
              />
            </label>
            <label>
              cloudy
              <input
                value={weather}
                onChange={() => setWeather("cloudy")}
                type="radio"
                name="weather"
              />
            </label>
            <label>
              stormy
              <input
                value={weather}
                onChange={() => setWeather("stormy")}
                type="radio"
                name="weather"
              />
            </label>
            <label>
              windy
              <input
                value={weather}
                onChange={() => setWeather("windy")}
                type="radio"
                name="weather"
              />
            </label>
          </div>
          <div>
            comment
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button>add</button>
        </form>
      </div>
      <h3>diray entries</h3>
      {diaries ? (
        <ul>
          {diaries.map((el) => (
            <li key={el.id}>
              {el.date} visibility: {el.visibility} weather: {el.weather}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default App;
