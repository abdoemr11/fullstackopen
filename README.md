
 
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

Regrade to remove the notification after x seconds, There was a proplem 
if you repeatedly press the button, we will end up with
multiple dispatch of removeNotification action. 
This happens due to each instance of set-timeout will run at 
asynchronously so for example If you vote anecdote 
and after 4 seconds you voted another one the notification
will be shown for only 1 seconds instead of one.

The solution is to remember the timer instance and 
recreate it at every button handler. useState is not 
suitable for this because every change to it cause 
the component to rerender, useRef is the antidote.

Using this technique we can handle the problem of 
immediate sort of anecdotes when voting them.

link for more redux store:   
[fundamental of redux store](https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc867)  
[context API](https://reactjs.org/docs/context.html)  
[React Hooks vs Redux](https://www.simplethread.com/cant-replace-redux-with-hooks/)  
[How To useContext With useReducer](https://hswolff.com/blog/how-to-usecontext-with-usereducer/)


## Part 7 

### custom hooks 
here are additional resources of hooks: 
- https://github.com/rehooks/awesome-react-hooks
- https://usehooks.com/
- https://overreacted.io/why-do-hooks-rely-on-call-order/

I found out that destructing object differ from array
the issue began in P7.6 when I needed to exclude 
the reset parameter from the return value
unfortunately object destructing doesn't work as
expected when there is a function in the object<br/>
In the next code 
```js
const {resetContent, ...content} = useField('content')
```
`content` here will equal the whole returned object 
from the hook where `resetContent` will be undefined.  
I thought something like this should work
```js
const {resetContent:reset, ...content} = useField('content')
```
but javascript has a different weird opinion
```js
const {reset:resetContent, ...content} = useField('content')
```
the original field should be on the left side.<br/>
Thanks for Nina for her [answer](https://stackoverflow.com/a/57065418)

### Extending the bloglist
prettier and eslint have common tasks but they are not the same
I need to search more on this topic.

> :warning: **I will ignore 7.18: 7.21 for now**

## Part 8
[How To GraphQl](https://www.howtographql.com/basics/) has a good introduction videos to GQL
### 8.1 
Apollo v4 has many changes compared to v3 
the two main changes: 
- the use of standalone server instead of using ApolloServer object directly
- gql is no longer imported from @apollo/server but from graphql-tag
for future reference check [this](https://www.apollographql.com/docs/apollo-server/migration/)
> const { v4: uuidv4 } = require('uuid'); lol 

### 8.3 
- It is not recommended to put the business logic into the resolver.  
- There is a method for importing JSON to Mongodb directly instead to manually importing them one by one or using mutation 
look [here](https://www.mongodb.com/compatibility/json-to-mongodb)
- The error handling has been changed in Apollo 4, All error classes get combined into one class and you use error code to differniate between them. [here](https://www.apollographql.com/docs/apollo-server/migration/#apolloerror)