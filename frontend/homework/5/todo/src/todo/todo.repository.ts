import { Injectable } from "@nestjs/common";
import { Todo } from "./todo.model";

@Injectable()
export class TodoRepository{
    private readonly todos: Todo[] = [];

    createTodo(todo: Todo): Todo {
        this.todos.push(todo);
        return todo;
    }

    findAllTodos(): Todo [] {
        return this.todos;
    }

    findById(id: string): Todo | undefined {
        return this.todos.find(t => t.id === id);
    }

    deleteById(id: string): Todo | undefined {
        const index = this.todos.findIndex(t => t.id === id);
        if(index === -1) return undefined;
        return this.todos.splice(index, 1)[0];
    }

}