<template>
  <div>
    <header>
      <div class="header-container">
        <h1>
          <router-link :to="{ name: 'home' }">Recipe</router-link>
        </h1>
        <search-form></search-form>
        <div class="header-bar">
          <nav>
            <ul class="nav__list">
              <li><a href="#" class="nav__list__link">收藏食譜</a></li>
              <li><a href="#" class="nav__list__link">帳號設定</a></li>
              <li><a href="#" class="nav__list__link">登出</a></li>
            </ul>
          </nav>
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
  width:100%;
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
  width: 960px;
  padding: 0 8px;
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

.nav__list {
  display:flex;
  list-style: none;
  align-items:center;
  justify-content:center;
}

.nav__list__link {
  padding:5px 10px;
  text-decoration:none;
  color:#000;
  font-family: "Syne Tactile", cursive;
  font-weight:600;
}

.nav__list__link:hover {
  color:#fff;
  background:#264653;
  border-radius:30px;
}
</style>