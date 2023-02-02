interface exerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}
const ratingText: string[] = [
    'very bad',
    'not too bad but could be better',
    'very good'
]
const calculateExercises = (days: number[], target: number): exerciseResult => {
    const averageHours = days.reduce(((p, c) => p+c), 0)/days.length 
    const isSuccess: boolean = averageHours> target? true: false
    let ratingResult:number;
    if(!isSuccess)
        ratingResult = averageHours/target > .05? 2: 1
    else
        ratingResult = 3
    return {
        periodLength: days.length,
        trainingDays: days.filter(d => d != 0).length,
        success: isSuccess,
        rating: ratingResult,
        ratingDescription: ratingText[ratingResult - 1],
        target: target,
        average: averageHours  
    }
}
interface Result {
    days: number[];
    target: number;
}
const handleArguments = (args: Array<string>): Result => {
    if(args.length < 3) 
        throw new Error("Tow few arguments");
    args = [...args.slice(2)]
    const numberArgs = args.map(a => {
        if(isNaN(Number(a)))
            throw new Error ('Provided values were not numbers!'+ a)
        return Number(a)
    })
    return {
        days: [...numberArgs.slice(1)],
        target: numberArgs[0]
    }
    
}

try {
    const {days, target} = handleArguments(process.argv);
    console.log(calculateExercises(days, target));

    
} catch (e: unknown) {
    if(e instanceof Error)
        console.log('There is a fatal Error:  ', e.message);
    
}
