
 
## Part5 
I just finished the cypress final part of part 5 "Testing React App".
Cypress which used in the course is v9 so there are many aspects changed, first of all the naming convention
then the the introducing of compoenent testing. 
I think in a future year FSO can use cypress instead of [testing-library](https://github.com/testing-library/react-testing-library)

Cypress appear to be very useful when it throw an cirtical error in the login process that I didn't notice before
and react didn't complain about it.

## Part6
In exercise 6.5 I implemented the order anecdotes behaviour when voting
this lead to instant update of the component which is not quite good, 
so I could use setTimout out like [here](https://www.pluralsight.com/guides/how-to-fire-periodic-actions-using-settimeout-and-dispatcher-in-redux)  
I should wait until finish Part6, maybe there is a trick here.


In redux createSlice if the initial state is null you must return the new state 
instead of mutating it otherwise it won't work
[see here](https://stackoverflow.com/questions/62966863/a-case-reducer-on-a-non-draftable-value-must-not-return-undefined)
