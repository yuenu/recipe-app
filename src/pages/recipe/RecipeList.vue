<template>
  <div>
    <base-spinner v-if="isLoading"> </base-spinner>
    <div class="body-container" v-else-if="!isLoading">
      <div class="background">
        <categroies-recipe @get-cat="getCategoryMeal"></categroies-recipe>
        <base-card>
          <div class="fav-container">
            <h3>收藏食譜</h3>
            <button
              class="clear_all_fav"
              @click="clearAllFavMeal"
              v-show="hasFavorite"
            >
              清除全部
            </button>
            <div class="fav-meal">
              <ul class="fav-meals" v-if="hasFavorite">
                <favorite-meal
                  v-for="fav in favMealToList"
                  :key="fav.mealId"
                  :mealName="fav.mealName"
                  :mealImageUrl="fav.mealImageUrl"
                  :mealInfo="fav.mealInfo"
                  :mealIngrendients="fav.mealIngrendients"
                  :mealId="fav.mealId"
                  @clear-fav="clearFav"
                ></favorite-meal>
              </ul>
              <p v-if="!hasFavorite" class="no_recpie">目前沒有收藏的食譜</p>
            </div>
          </div>
        </base-card>

        <base-card>
          <p class="error_msg" v-if="!!error">{{ error }}</p>
          <recipe-preview
            v-else
            v-for="item in loadMeal"
            :key="item.mealId"
            :mealId="item.mealId"
            :mealName="item.mealName"
            :mealImageUrl="item.mealImageUrl"
            :mealInfo="item.mealInstructions"
            :mealIngrendients="item.mealIngrendients"
            :isSearch="isSearch"
            :isRemoved="isRemoved"
            @add-fav="addFavorite"
            :ref="'preview' + item.mealId"
          >
          </recipe-preview>
        </base-card>
        <!-- <button @click="loadRandomRecipe">更多</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "../../components/recipe/RecipePreview.vue";
import CategroiesRecipe from "../../components/recipe/CategroiesRecipe.vue";
import FavoriteMeal from "../../components/recipe/FavoriteMeal.vue";

export default {
  name: "list",
  data() {
    return {
      isLoading: false,
      isRemoved: false,
      error: null,
    };
  },
  components: {
    RecipePreview,
    CategroiesRecipe,
    FavoriteMeal,
  },
  created() {
    this.loadRandomRecipe();
  },
  methods: {
    async loadRandomRecipe() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/getRandomMeal");
      } catch (error) {
        // this.error = error.message || "LoadRecipe failed";
        this.error = "無法獲取到食譜資料，請確認您的網路連線是否正常";
      }
      this.isLoading = false;
    },
    async getCategoryMeal(cat) {
      try {
        await this.$store.dispatch("requests/getMealByCategory", cat);
      } catch (error) {
        this.error = "無法獲取到食譜資料，請確認您的網路連線是否正常";
      }
    },
    clearAllFavMeal() {
      // To cancel heart when remove ALL meals
      this.isRemoved = true;
      this.$store.dispatch("requests/clearAllFavMeal");
    },
    addFavorite() {
      // Reset removed property
      this.isRemoved = false;
    },
    clearFav(mealId) {
      if (this.$refs["preview" + mealId] === null) {
        this.$store.dispatch("requests/removeFavMeal", { mealId });
      } else {
        this.$refs["preview" + mealId].removeFavorite(mealId);
      }
    },
  },
  computed: {
    loadMeal() {
      const inputMeal = this.$store.getters["requests/requestMeal"];
      const randomMeal = this.$store.getters["requests/randomMeal"];
      if (inputMeal) return inputMeal;
      return randomMeal;
    },
    isSearch() {
      return this.$store.getters["requests/hasSearch"];
    },
    favMealToList() {
      return this.$store.getters["requests/favoriteMeal"];
    },
    hasFavorite() {
      return this.$store.getters["requests/hasFavoriteMeal"];
    },
  },
};
</script>

<style scoped>
.body-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.background {
  min-height: 90vh;
  width: 400px;
}

.fav-container {
  background-color: white;
  position: relative;
}

.fav-container h3 {
  font-size: 1.5rem;
  text-align: center;
  margin: 0.8rem 0;
}
.fav-meals {
  display: flex;
  margin: 1rem 0.2rem;
  overflow: auto;
}

.fav-meals li img {
  border-radius: 50%;
  padding: 0;
  width: 65px;
  height: 65px;
  cursor: pointer;
  border: 2px #c3c3c3 solid;
  box-shadow: 0 0 10px 2px #3333331a;
  object-fit: cover;
}

.fav-meals li span {
  display: inline-block;
  font-size: 0.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 75px;
}

.fav-meals li span:hover {
  white-space: normal;
}

.no_recpie {
  font-size: 1.5rem;
  text-align: center;
  margin: 2rem 1rem;
  padding: 1rem 0;
  background: lightgray;
  color: #000;
}

.clear_all_fav {
  position: absolute;
  padding: 0 5px;
  background: lightyellow;
  top: 0;
  right: 5%;
  font-weight: bold;
  font-size: 1rem;
  border: 1px solid #cccc;
}

.error_msg {
  padding: 0.8rem;
  font-size: 1rem;
  text-align: center;
}
</style>
