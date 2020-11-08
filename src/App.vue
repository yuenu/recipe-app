<template>
  <the-header></the-header>
  <recipe-list></recipe-list>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import RecipeList from "./pages/recipe/RecipeList.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    RecipeList,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Syne+Tactile&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Poppins", sans-serif;
  background: #fafafa;
  min-height: 100vh;
}
</style>
