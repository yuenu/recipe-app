<template>
  <div>
    <header>
      <div class="header-container">
        <h1>
          <router-link :to="{ name: 'home' }">Recipe</router-link>
        </h1>
        <search-form></search-form>
        <div class="header-bar">
          <div class="icon">
            <font-awesome-icon far
                               icon="heart"
                               size="lg" />
          </div>
          <div class="icon">
            <font-awesome-icon icon="user"
                               size="lg" />
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import SearchForm from "../recipe/SearchForm.vue";

export default {
  components: {
    SearchForm,
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-bottom: 1px #cccccc solid;
}

h1 a {
  font-family: "Syne Tactile", cursive;
  text-decoration: none;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  width: 500px;
  /* background-color: lightcyan; */
  background-color: white;
  padding: 0 1rem;
}

.header-bar {
  display: flex;
}

.icon {
  padding: 0 6px;
}

.icon svg {
  color: #cccccc;
}

.icon svg:hover {
  color: rebeccapurple;
  filter: drop-shadow(0 0 3px rebeccapurple);
}
</style>