import { observable, action, computed } from "mobx";

class Store {
    @observable todos = [];
    @observable id = 0;
    @observable currentTodos = [];
    @observable test = '';

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
    testfunc(str) {
        this.test = str;
        console.log('test', this.test);
    }

    @action
    setTest() {
        setTimeout(this.testfunc('hello world'), 1000)
        // this.testfunc('hello world');
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


}

export default new Store();
