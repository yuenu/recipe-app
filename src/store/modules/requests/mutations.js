export default {
	addFavMeal(state, payload) {
		state.favorite.push(payload)
	},
	setRequest(state, payload) {
		state.requests = payload
	},
	setRandomRequest(state, payload) {
		state.random = payload
	},
	setFavoriteMeal(state, payload) {
		state.favorite = payload
	},
	clearFavoriteList(state) {
		state.favorite = []
	},

}