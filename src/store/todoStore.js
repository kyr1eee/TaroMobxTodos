import { observable, action } from "mobx";

class Store {
    @observable todos = [];
    @observable id = 0;
    @observable completed = false;

    @action
    addTodo(todo) {
        this.todos.push({todo, id: this.id++, completed: false});
    }

    @action
    toggleTodo(id) {
        this.todos.filter(index => index + 1 === id)
    }

    get todos() {
        return this.todos;
    }

}

export default new Store();
