import { addNewTask, updateTask } from './server';

(async function myFunc(){
await addNewTask({
    name:"Eat lunch and dinner during breakfast",
    id:"1234"
});

await updateTask({
    name:"Eat lunch and dinner during breakfast every day",
    id:"1234"
});


})();