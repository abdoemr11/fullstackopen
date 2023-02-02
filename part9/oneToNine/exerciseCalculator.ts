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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

