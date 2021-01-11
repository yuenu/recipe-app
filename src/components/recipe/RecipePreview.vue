<template>
  <div>
    <base-popup :show="isShow"
                @close="switchPopup"
                :mealName="mealName"
                :mealInfo="mealInfo === undefined ? info : mealInfo"
                :mealIngrendients="mealIngrendients === undefined ? ingrendient : mealIngrendients"
                :mealImageUrl="mealImageUrl">
    </base-popup>
    <div class="meal">
      <div class="meal-header">
        <span class="random"
              v-if="!isSearch">精選食譜</span>
        <img @click="switchPopup"
             :src="mealImageUrl"
             :alt="mealName">
      </div>
      <div class="meal-body">
        <h4>{{ mealName }}</h4>
        <div @click="addFavorite"
             :class="{ fav: isFav && thisfavoriteMeal }"
             class="icon">
          <font-awesome-icon icon="heart"
                             size="lg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["add-fav"],
  data() {
    return {
      isShow: false,
      isFav: false,
      ingrendient: [],
      info: "",
    };
  },
  props: {
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
    mealId: {
      type: String,
      required: false,
    },
    isSearch: {
      type: Boolean,
      required: true,
    },
    isRemoved: {
      type: Boolean,
      required: true,
    },
  },
  beforeMount() {
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
    switchPopup() {
      this.isShow = !this.isShow;
    },
    switchIsFavorite() {
      this.isFav = !this.isFav;
    },
    addFavorite() {
      this.switchIsFavorite();
      this.$emit("add-fav");
      const data = {
        mealId: this.mealId,
        mealName: this.mealName,
        mealImageUrl: this.mealImageUrl,
        mealInfo: this.mealInfo,
        mealIngrendients: this.mealIngrendients,
      };
      // ADD meal to favorite List
      if (this.isFav) {
        this.$store.dispatch("requests/addFavMeal", {
          ...data,
          isFavorite: true,
        });
      }
      // Remove meal from favorite List
      // HINT:
      if (!this.isFav && this.hasFavMeals) {
        this.$store.dispatch("requests/removeFavMeal", data);
      }
    },
    removeFavorite(mealId) {
      // TODO: if remove this.meal  the heart is uncontrol
      this.isFav = false;
      this.$store.dispatch("requests/removeFavMeal", { mealId });
    },
  },
  computed: {
    hasFavMeals() {
      return this.$store.getters["requests/hasFavoriteMeal"];
    },
    thisfavoriteMeal() {
      return this.$store.getters["requests/favoriteMeal"];
    },
  },
  watch: {
    isRemoved: function (removed) {
      if (removed) {
        this.isFav = false;
      }
    },
  },
};
</script>

<style scoped>
.meal {
  margin: 1rem;
  border-radius: 3px;
  box-shadow: 0 0 10px 5px #3333331a;
  overflow: hidden;
}

.meal-header {
  position: relative;
  cursor: pointer;
}

.meal-header .random {
  position: absolute;
  background: rgb(186, 245, 229);
  color: #000;
  top: 1.4rem;
  padding: 4px;
  font-weight: bold;
}

.meal-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgb(255, 216, 222);
}

.meal img {
  object-fit: cover;
  height: 260px;
  width: 100%;
}

.meal-body h4 {
  font-family: "Syne Tactile", cursive;
}

.icon svg {
  color: #cccccc;
  cursor: pointer;
}

.icon svg:hover {
  color: rebeccapurple;
  filter: drop-shadow(0 0 1px rebeccapurple);
}

.icon.fav svg {
  color: red;
  filter: drop-shadow(0 0 1px red);
}
</style>