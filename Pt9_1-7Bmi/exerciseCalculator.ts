interface calculateExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export const calculateExercise = (
  dailyExecise: number[],
  target: number
): calculateExerciseResult => {
  const average =
    dailyExecise.reduce((prev, cur) => prev + cur) / (dailyExecise.length + 1);
  const success = average >= target ? true : false;

  let rating: number, ratingDescription: string;
  if (average > target) {
    rating = 3;
    ratingDescription = "Good job";
  } else if (average > target * 0.7) {
    rating = 2;
    ratingDescription = "Could be better";
  } else {
    rating = 1;
    ratingDescription = "Very Bad";
  }

  return {
    periodLength: dailyExecise.length + 1,
    trainingDays: dailyExecise.filter((el) => el > 0).length,
    average,
    target,
    success,
    rating,
    ratingDescription,
  };
};
