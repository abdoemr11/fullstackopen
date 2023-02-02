interface category {
    value: string;
    range: [number, number];
}
const bmiCategories: category[] = [
    {
        value: "Underweight (Severe thinness)",
        range: [0, 16]
    },
        {
        value: "",
        range: [16.0, 16.9]
    },
        {
        value: "Underweight (Mild thinness)",
        range: [17.0, 18.4]
    },
        {
        value: "Normal range",
        range: [18.5, 24.9]
    },
        {
        value: "Overweight (Pre-obese)",
        range: [25.0, 29.9]
    },
        {
        value: "Obese (Class I)",
        range: [30.0, 34.9]
    }, {
        value: "Obese (Class II)",
        range: [35.0, 39.9	]
    },

]
const getCategory = (bmi: number): string => {
    let resultCategory: string = null;
    bmiCategories.forEach( category => {
        if( bmi <= category.range[1] && bmi >= category.range[0])
            resultCategory = category.value;
    })
    if(!resultCategory)
        throw new Error("This is not a valid bmi value");
    return resultCategory;
}

const calculateBmi = (height: number, weight: number) => {
    let heightInMeters = height / 100
    let bmi = weight / (heightInMeters * heightInMeters)
    return getCategory(bmi)
}
interface Result {
    height: number;
    weight: number;
}
const handleArguments = (args: Array<string>): Result => {
    if(process.argv.length < 3 || process.argv.length > 4) {
        throw new Error("You should provide input in `Height Weight` Form")
    }
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          weight: Number(args[3])
        }
      } else {
        throw new Error('Provided values were not numbers!');
      }
    
}

try {
    const {height, weight} = handleArguments(process.argv);
    console.log(calculateBmi(height, weight));
    
} catch (e: unknown) {
    if(e instanceof Error)
        console.log('There is a fatal Error:  ', e.message);
    
}



export {}