import express  from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
  });

interface bmiParameters { 
    height: number; 
    weight: number;
}
app.get('/bmi', (req, res) => {
    let bmiparam: bmiParameters;
    
    if(req.query && req.query.height && req.query.weight) {
      bmiparam = {
        height: Number(req.query.height),
        weight: Number(req.query.weight)
      };


    } else {
      return res.send({
        error: "malforamted parameter"
      });
        
    }
    const bmiResult = calculateBmi(bmiparam.height, bmiparam.weight);
    return res.send({
      weight: bmiparam.weight, 
      height: bmiparam.height,
      bmi: bmiResult
    });
    
});

app.post('/exercises', (req, res) => {
  console.log('hi');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let { target} = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  let days = req.body.daily_exercises;
  console.log(typeof days);
  
  //validate that all number of elements is present
  if(!days || !target || !Array.isArray(days)) {
    return res.status(400).send({
      error: "missing parameters"
    });
  }
  //convert the parameter from string if possible
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  days = days.map((d: unknown) => Number(d));
  target = Number(target);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
  if(days.some(isNaN) ||isNaN(target) )
    return res.status(400).send({
      error: "malformated parameter"
    });


  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const exercisesResult = calculateExercises(days, target);
  
  return res.send(exercisesResult);
});
  const PORT = 3003;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });