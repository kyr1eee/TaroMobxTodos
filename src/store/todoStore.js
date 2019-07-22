import { observable, action, computed } from "mobx";

class Store {
    @observable todos = [];
    @observable id = 0;
    @observable currentTodos = [];

    @action
    addTodo(todo) {
        this.todos.push({todo, id: this.id++, completed: false});
        this.currentTodos = this.todos;
    }

    @action
    setCurrentTodos(todos) {
        this.currentTodos = todos;
    }

    @action
    toggleTodo(id) {
        this.todos[id].completed = !this.todos[id].completed;
    }

    @computed
    get completedTodos() {
        return this.todos.filter(item => item.completed === true);
    }

    @computed
    get unCompletedTodos() {
        return this.todos.filter(item => item.completed === false);
    }

    get todos() {
        return this.todos;
    }

    get currentTodos() {
        return this.currentTodos;
    }


}

export default new Store();
