import Vue from 'vue'

Vue.component('sceance', {
	template: require('./templates/sceance.html'),
	methods: {
		toggleEdit: function(){
			this.editing = !this.editing
		},
		newExo: function(){
			this.modele.push({
				nom: 'Exercice #' + this.modele.length,
				nbSeries: 6,
				mode: 6
			})
		},
		deleteExo: function(index){
			this.modele.$remove(index)
		},
		editExo: function(index){
			if (this.editing === false) {
				this.editedExo = {
					nom: this.modele[index].nom,
					nbSeries: this.modele[index].nbSeries,
					mode: this.modele[index].mode,
					index: index
				}
			}
		},
		currentlyEditingExo: function(){
			if (this.editedExo !== null) {
				return true
			} else {
				return false
			}
		},
		cancelEditedExo: function(){
			this.editedExo = null
		},
		saveEditedExo: function(){
			this.modele[this.editedExo.index].nbSeries = this.editedExo.nbSeries
			this.modele[this.editedExo.index].mode = this.editedExo.mode
			this.modele[this.editedExo.index].nom = this.editedExo.nom

			this.editedExo = null
		}
	},
	data: () => {
		return {
			editing: false,
			editedExo: null,
			modele: [
				{
					nom: 'B2',
					nbSeries: 6,
					mode: 12
				},
				{
					nom: 'A12',
					nbSeries: 6,
					mode: 10
				},
				{
					nom: 'A6',
					nbSeries: 6,
					mode: 8
				}
			]
		}
	}
})