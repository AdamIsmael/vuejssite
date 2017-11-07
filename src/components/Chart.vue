<template>
	<div>
		<p v-show="loaded">A bitcoin is worth {{price[0]/ethPrice[0]}} ethereum coins </p>
		<p v-show="loaded">An ethereum coin is worth {{ethPrice[0]/price[0]}} bitcoins </p>		
		<b-container class="row" >
			<b-row >
				<b-col >
					<p v-show="!loaded">Loading.....</p>
					<vue-chart v-show="loaded" align="center"
					:columns="columns"
					:rows="rows"
					:options="options"
					></vue-chart>
					<!-- charttyp=geochart, barchart -->		
				</b-col>

				<b-col>
					<b-btn v-b-toggle.collapse1 variant="primary">Options</b-btn>
					<b-collapse id="collapse1" class="mt-2">
						<b-card>
							<div class="btn-group-vertical">
							<button id="update" type="button" class="btn btn-primary" v-on:click="refresh()">Update Chart</button>
							<button id="refresh" type="button" class="btn btn-primary" v-on:click="makeAPICall()">Refresh</button>
							<b-form-input v-model="precision" type="number" min="1"></b-form-input>
							<b-form-select v-model="ticker" class="mb-3">
								<option value="BTC">Bitcoin</option>
								<option value="ETH">Ethereum</option>
							</b-form-select>
							<b-form-select v-model="currency" class="mb-3">
								<option value="GBP">Great British Pounds</option>
								<option value="USD">US Dollars</option>
							</b-form-select>
							</div>
						</b-card>
					</b-collapse>

				</b-col>
			</b-row>
		</b-container>	
	</div>
</template>



<script type="text/javascript">
import axios from 'axios';
export default{
	name: 'Chart',
/*	props: ['currency'],*/
	methods: {
		refresh(){
			this.columns[1].label=this.ticker;
			//this.options.title=this.ticker;
			this.rows.splice(0, this.rows.length);
			// for (var i = this.date.length-1; i > (this.date.length-this.precision); i--) {
			// 	this.rows.push([this.date[i],this.price[i]]);
			// }
			for (var i = 0; i < this.precision; i++) {
				//console.log(this.date[i])
				var subSetDate=this.date[i].substring(10,16);
				this.rows.push([subSetDate,this.price[i]]);
			}
			this.rows.reverse();
		},
		makeAPICall(){
			this.loaded=false
			var baseStr='https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol='+this.ticker+'&market=GBP&apikey=8F7M87KLF8C4VUUN';
			axios.get(baseStr)
			.then(response => {
				
				if(this.ticker=="BTC"){
					this.options.title="Bitcoin";
				}else{
					this.options.title="Ethereum";
				}
				var data=response.data["Time Series (Digital Currency Intraday)"];
				this.date.splice(0,this.date.length);
				this.price.splice(0,this.price.length);

				var column="1a. price (GBP)";
				if(this.currency=="USD"){
					column="1b. price (USD)"
					this.options.vAxis.title="USD";
				}
				for(var btcDate in data){
					this.date.push(btcDate);
					this.price.push(Number(data[btcDate][column]));
				}
				this.loaded=true;
				this.refresh();
			})
			.catch(e=>{
				console.log(e);
				this.errors.push(e);
			});
		},
		getEthData(){
			var baseStr='https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=ETH&market=GBP&apikey=8F7M87KLF8C4VUUN';
			axios.get(baseStr)
			.then(response=>{
				var data = response.data["Time Series (Digital Currency Intraday)"];
				this.ethPrice.splice(0, this.ethPrice.length);
				for(var date in data){
					this.ethPrice.push(Number(data[date]["1a. price (GBP)"]));
				}
			})
			.catch(e=>{
				console.log(e);
				this.errors.push(e)
			});
		},
		onResize(event){
			//console.log(event);
			this.refresh();
			// const self = this;
			// for (var idx in self.$children) {
   //            self.$children[idx].$emit('redrawChart');
   //          }
		},
	},
	data() { 
		return{
		loaded: false,
		price: [],
		date: [],
		ethPrice: [],
		precision: 100,
		ticker: 'BTC',
		currency: 'GBP',
		// options: [
		// 	{value:'BTC', text:'Bitcoin'},
		// 	{value:'ETC', text:'Ethereum'},
		// 	],
		columns: [{
			type: 'string',
			label: 'Year'
		}, {
			type: 'number',
			label: 'Bitcoin'
		}],
		rows: [
		['12:00',6000],
		['12:05',6050],
		['12:10',6150],
		['12:15',6500],
		['12:20',5950],
			],
		options: {
			title: 'Graphs',
			hAxis: {
				title: 'Time',
						// minValue: '2004',
						// maxValue: '2007'
					},
					vAxis: {
						title: 'GBP',
						// minValue: 300,
						// maxValue: 1200
					},
					height: 500,
					curveType: 'function',
					width: 1000,
				}
			};
		},
		created(){
			//this.loaded=true;
			this.getEthData();
			this.makeAPICall();
			// const self = this;
	  //       this.$on('redrawChart', function() {
	  //           for (var idx in self.$children) {
	  //             self.$children[idx].$emit('redrawChart');
	  //           }
	  //           // console.log(self.$children);
	  //         });
	},
mounted(){
	window.addEventListener('resize', this.onResize);
},
beforeDestroy(){
	window.removeEventListener('resize', this.onResize)
}
}

</script>


<style type="text/css">
.row{
	margin:auto;
	max-width:2000px;
}
.select{
	width:150px;
}
#update{
    border-bottom: solid;
}
</style>