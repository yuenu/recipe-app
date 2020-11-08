
async function addMeal(mode = 'random', type) {
	const uMode = mode
	let response;
	if (uMode === 'random') {
		response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
	} else if (uMode === 'search') {
		response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${type}`)
	} else if (uMode === 'id') {
		response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${type}`)
	} else if (uMode === 'category') {
		response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${type}`)
	}
	const responseData = await response.json()
	if (!response.ok) {
		const error = new Error(responseData.message || 'Failed to fetch request getRandomMeal.')
		throw error
	}
	const mealsData = responseData.meals

	const requests = []
	mealsData.forEach((meal) => {
		const mealId = meal.idMeal
		const mealName = meal.strMeal
		const mealImageUrl = meal.strMealThumb
		const mealInstructions = meal.strInstructions
		const mealIngrendients = [];

		for (let i = 1; i <= 20; i++) {
			if (meal['strIngredient' + i]) {
				mealIngrendients.push(`
							${meal['strIngredient' + i]} 
							→ ${meal['strMeasure' + i]}
							`)
			}
		}
		const request = {
			mealId,
			mealName,
			mealImageUrl,
			mealInstructions,
			mealIngrendients,

		}
		requests.push(request)
	})
	return requests
}

export default {
	async getRandomMeal(context) {
		const requests = await addMeal('random')
		context.commit('setRandomRequest', requests)
	},

	async getMealsBySearch(context, input) {
		const requests = await addMeal('search', input)
		context.commit('setRequest', requests)
	},

	async getMealById(context, id) {
		const requests = await addMeal('id', id)
		context.commit('setRequest', requests)
	},


	async getMealByCategory(context, category) {
		const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)

		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to fetch request getMealsBySearch.')
			throw error
		}
		const responseData = await response.json()
		const mealsData = responseData.meals
		const requests = []

		if (mealsData) {
			mealsData.forEach((meal) => {
				requests.push({
					mealName: meal.strMeal,
					mealImageUrl: meal.strMealThumb,
					mealId: meal.idMeal
				})
			})
		} else {
			console.log('no data')
		}
		context.commit('setRequest', requests)
	},


	addFavMeal(context, payload) {
		context.commit('addFavMeal', payload)
	},

	removeFavMeal(context, payload) {
		// For category filter by mealName
		const req = context.getters.favoriteMeal.filter(meal => meal.mealId !== payload.mealId)
		context.commit('setFavoriteMeal', req)
	},
	clearAllFavMeal(context) {
		context.commit('clearFavoriteList')
	},
	switchIsFav(context, payload) {
		context.commit('switchIsFav', payload)
	}
}
