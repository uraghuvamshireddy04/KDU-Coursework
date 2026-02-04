import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoResponseDto } from "./dto/todo-response.dto";

@Controller('api/v1/todos')
export class TodoController {
   constructor(private readonly todosService: TodoService) {}
   @Post()
   createTodo(@Body() dto: CreateTodoDto): TodoResponseDto{
    return this.todosService.createTodo(dto);
   }

   @Get(':id')
   getTodoById(@Param('id', new ParseUUIDPipe()) id: string): TodoResponseDto {
    return this.todosService.getTodoById(id);
   }
   
   @Get()
   getAllTodos(): TodoResponseDto[] {
    return this.todosService.getAllTodos();
  }

  @Delete(':id')
  deleteTodoById(@Param('id', new ParseUUIDPipe()) id: string): TodoResponseDto {
    return this.todosService.deleteTodoById(id);
  }
}