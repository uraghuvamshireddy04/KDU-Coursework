import { Injectable, NotFoundException } from "@nestjs/common";
import { TodoRepository } from "./todo.repository";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoResponseDto } from "./dto/todo-response.dto";
import { randomUUID } from "node:crypto";
import { Todo } from "./todo.model";

@Injectable()
export class TodoService {
    constructor(private readonly repo: TodoRepository) {

    }

    private toResponseDto(todo: Todo): TodoResponseDto {
      return {
       title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt,
     };
    }

    createTodo(dto: CreateTodoDto): TodoResponseDto {
        const now = new Date();

        const todo: Todo = {
            id: randomUUID(),
            title: dto.title,
            description: dto.description,
            completed: false,
            createdAt: now,
            updatedAt: now,

        };
        console.log(todo.id);
        const saveTodo = this.repo.createTodo(todo);
        return this.toResponseDto(saveTodo);
    } 

    getAllTodos(): TodoResponseDto[] {
        return this.repo.findAllTodos().map(todo => this.toResponseDto(todo));
    }

    getTodoById(id: string): TodoResponseDto {
        const todo = this.repo.findById(id);
        if (!todo) throw new NotFoundException(`Todo ${id} not found`);
        return this.toResponseDto(todo);
    }

    deleteTodoById(id: string): TodoResponseDto {
        const todo = this.repo.deleteById(id);
        if (!todo) throw new NotFoundException(`Todo ${id} not found`);
        return this.toResponseDto(todo);
    }


}