export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height ^ 2);

  if (bmi < 15) return "Very severely underweight";
  else if (bmi < 16) return "Severely underweight";
  else if (bmi < 18.5) return "Underweight";
  else if (bmi < 25) return "Normal";
  else if (bmi < 30) return "Overweight";
  else if (bmi < 35) return "Moderately obese";
  else if (bmi < 40) return "Severely obese";
  else return "Very severely obese";
};

const parseArguments = (args: string[]): { value1: number; value2: number } => {
  if (args.length > 4) throw new Error("Not enough arguments");
  if (args.length < 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])))
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  throw new Error("provied values are not numbers");
};

export const bmiCalculator = () => {
  try {
    const { value1, value2 } = parseArguments(process.argv);
    const message = calculateBmi(value1, value2);
    console.log(message);
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    if (err instanceof Error) errorMessage += " Error " + err.message;
    console.log(errorMessage);
  }
};
