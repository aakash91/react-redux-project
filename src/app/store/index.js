import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga';

import * as sagas from './sagas';
import * as mutations from './mutations';

const sagaMiddleware=createSagaMiddleware();

export const store = createStore(
    combineReducers({
        session(userSession=defaultState.session || {}, action ){
            let {type, authenticated, session}= action;
            switch(type){
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return{...userSession, authenticated: mutations.AUTHENTICATING};
                case mutations.PROCESSING_AUTHENTICATE_USER:
                    return{...userSession, authenticated}
                default:
                    return userSession;
            }
            return session;
        },
        tasks(tasks=defaultState.tasks, action){
            switch(action.type){
                case mutations.CREATE_TASK:
                    console.log("trying to create task");
                    // console.log(action);
                    return [...tasks,{
                        id: action.taskID,
                        name:"new task",
                        group: action.groupID,
                        owner:action.ownerID,
                        isComplete: false
                    }]
                case mutations.SET_TASK_COMPLETE:
                    console.log("change completion val", action.groupID)    ;
                    return tasks.map(task => {
                        return (task.id === action.taskID) ?
                        {...task, isComplete:action.isComplete} : task;
                    })
                case mutations.SET_TASK_NAME:
                        console.log("change name val", action.groupID)    ;
                        return tasks.map(task => {
                            return (task.id === action.taskID) ?
                            {...task, name:action.name} : task;
                        })
                case mutations.SET_TASK_GROUP:
                    console.log("change group val",action.groupID)    ;
                    return tasks.map(task => {
                        return (task.id === action.taskID) ?
                        {...task, group:action.groupID} : task;
                    })
            }
            return tasks;
        },
        comments(comments=defaultState.comments){
            return comments;
        },
        users(users=defaultState.users){
            return users;
        },
        groups(groups=defaultState.groups){
            return groups;
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
)


for (let saga in sagas){
    sagaMiddleware.run(sagas[saga])
}