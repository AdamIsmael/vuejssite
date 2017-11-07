<template>
	<div id="stock" >
		<chart></chart>
<!--  v-bind:ticker="ticker" v-bind:currency="currency" v-bind:precision="precision" -->
<!-- 		<input v-model="precision" id="number" type="number" min="1"> -->
<!-- 		<li v-for="stock in price">
			<p>{{stock}}</p>
		</li> -->

	</div>
</template>

<script type="text/javascript">

import Chart from '@/components/Chart'

export default {
	name: 'Stock',
	components: {Chart},
	data() {
	 	return {
			// precision: 100,
	 	}
	}, 
	methods: {
		create(){
			axios.get(`http://jsonplaceholder.typicode.com/posts`)
			.then(response => {
				this.posts=response.data;
			})
			.catch(e=>{
				this.errors.push(e)
			})
		},
	},
	watch: {
		// '$route': function(value){

		// }
	},
	created(){
	}

}


</script>
