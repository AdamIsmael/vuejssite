<template>
	<div>
		<p>Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}</p>
	    <p>Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}</p>
		<todo v-on:complete-todo="completeTodo" v-on:delete-todo="deleteTodo" v-for="todo in todos" v-bind:todo="todo" :key="todo.id" ></todo>
		<!-- :todo.sync="todo" -->
		<create-todo v-on:create-todo="addTodo"></create-todo>
	</div>
</template>

<script>
import Todo from '@/components/Todo'
import CreateTodo from '@/components/CreateTodo'

export default {
	name: 'TodoList',
	props:['todos'],
	components: {
		Todo,
		CreateTodo,
	},
	methods: {
		deleteTodo(todo){
			//this.$router.app.$emit('delete-todo',todo);
			//this.$emit('delete-todo',todo);
			const index = this.todos.indexOf(todo);
			this.todos.splice(index,1);
			//var porpar = this.$router.options.routes[0].props;
		},
		completeTodo(todo){
			const index = this.todos.indexOf(todo);
			this.todos[index].done=true;
		},
		addTodo(todo){
			this.todos.push({title:todo.title, project: todo.project, done: todo.done,
			})
		},
	},	
	watch: {
  	'$route' (to,from){
      alert("watch")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>
