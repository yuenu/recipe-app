export default {
	requestMeal(state) {
		if (state.requests.length > 0)
			return state.requests
		return !state.requests
	},
	randomMeal(state) {
		return state.random
	},
	hasSearch(state) {
		if (state.requests.length > 0)
			return true
		return false
	},
	favoriteMeal(state) {
		return state.favorite
	},
	hasFavoriteMeal(state) {
		return state.favorite && state.favorite.length > 0
	},

}