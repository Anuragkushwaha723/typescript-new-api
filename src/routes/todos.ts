import {Router} from 'express';
import { Todo } from '../models/todo';
let todos:Todo[]=[];
type requestBodyText={text:string};
type requestBodyId={id:string};
type requestBody={id:string;text:string};
const router=Router();
router.get('/',(req,res,next)=>{
    res.status(201).json({todos:todos})
})
router.post('/todo',(req,res,next)=>{
    const Body=req.body as requestBodyText
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:Body.text
    };
    todos.push(newTodo);
    res.status(201).json({todos:newTodo});
})
router.post('/todoDelete',(req,res,next)=>{
    const Body=req.body as requestBodyId;
    const todoId=Body.id;
    const findTodoIndex=todos.findIndex(ele=>{
        return todoId===ele.id;
    });
    const updatedTodos:Todo[]=[];
    if(findTodoIndex!=-1){
        for(var i=0;i<todos.length;i++){
            if(i===findTodoIndex){
                continue;
            }else{
                updatedTodos.push(todos[i]);
            }
        }
        todos=[...updatedTodos];
        return res.status(201).json({todos:todos});
    }else{
        return res.status(404).json({message:'This id is not exist'});
    }
})
router.post('/todoEdit',(req,res,next)=>{
    const Body=req.body as requestBody;
    const todoId:string=Body.id;
    const todoText=Body.text;
    const newTodo:Todo={
        id:todoId,
        text:todoText
    }
    const findTodoIndex=todos.findIndex(ele=>{
        return todoId===ele.id;
    });
    const updatedTodos:Todo[]=[];
    if(findTodoIndex!=-1){
        for(var i=0;i<todos.length;i++){
            if(i===findTodoIndex){
                updatedTodos.push(newTodo);
            }else{
                updatedTodos.push(todos[i]);
            }
        }
        todos=[...updatedTodos];
        return res.status(201).json({todos:todos});
    }else{
        return res.status(404).json({message:'This id is not exist'});
    }
})
export default router;