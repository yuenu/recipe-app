<template>
  <div>
    <base-popup :show="isPopup"
                @close="popupSwitch"
                :mealName="mealName"
                :mealInfo="mealInfo === undefined ? info : mealInfo"
                :mealIngrendients="mealIngrendients === undefined ? ingrendient : mealIngrendients"
                :mealImageUrl="mealImageUrl">
    </base-popup>

    <li><img @click="popupSwitch"
           :src="mealImageUrl"
           :alt="mealName">
      <span>{{ mealName }}</span>
      <button @click="clearFav"
              class="clear-fav">
        <font-awesome-icon icon="times"
                           size="lg" />
      </button>
    </li>
  </div>
</template>

<script>
export default {
  emits: ["clear-fav"],
  data() {
    return {
      isPopup: false,
      ingrendient: [],
      info: "",
    };
  },
  props: {
    mealId: {
      type: String,
      required: true,
    },
    mealName: {
      type: String,
      required: true,
    },
    mealImageUrl: {
      type: String,
      required: true,
    },
    mealInfo: {
      type: String,
      required: false,
      default: undefined,
    },
    mealIngrendients: {
      type: Array,
      required: false,
      default: undefined,
    },
  },
  mounted() {
    this.fetchMealInfo();
  },
  methods: {
    async fetchMealInfo() {
      if (this.mealInfo === undefined || this.mealIngrendients === undefined) {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.mealId}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          const error = new Error(
            responseData.message || "Failed to fetch request getRandomMeal."
          );
          throw error;
        }
        const meals = responseData.meals[0];
        this.info = meals.strInstructions;
        const ingrendients = [];

        for (let i = 1; i <= 20; i++) {
          if (meals["strIngredient" + i]) {
            ingrendients.push(`
							${meals["strIngredient" + i]} 
							→ ${meals["strMeasure" + i]}
							`);
          }
        }
        this.ingrendient = ingrendients;
      }
    },
    popupSwitch() {
      this.isPopup = !this.isPopup;
    },
    clearFav() {
      this.$emit("clear-fav", this.mealId);
    },
  },
};
</script>

<style scoped>
.fav-meals li {
  list-style: none;
  position: relative;
}

.fav-meals li img {
  width: 65px;
  height: 65px;
  cursor: pointer;
  border-radius: 50%;
  border: 2px #c3c3c3 solid;
  box-shadow: 0 0 10px 2px #3333331a;
  object-fit: cover;
  background-color: white;
  margin: 0.5rem;
  display: flex;
}

.fav-meals li img:hover {
  transform: scale(1.1);
  border: 2px rgb(255, 114, 126) solid;
}

.fav-meals li span {
  width: 75px;
  font-size: 0.7rem;
  display: inline-block;
  word-wrap: break-word;
  text-align: center;
}

.fav-meals li .clear-fav {
  position: absolute;
  background-color: transparent;
  outline: none;
  border: none;
  opacity: 0;
  top: -10%;
  right: 0;
}

.fav-meals li:hover .clear-fav {
  opacity: 1;
}
</style>