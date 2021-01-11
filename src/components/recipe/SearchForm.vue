<template>
  <div class="search">
    <form @submit.prevent="submitForm">
      <input id="search-tern"
             type="text"
             placeholder="搜尋"
             v-model.trim="searchInput">
      <button id="search">
        <font-awesome-icon icon="search"
                           size="lg" />
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch("requests/getMealsBySearch", this.searchInput);
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  max-width:200px;
  background-color: #eee;
}

#search-tern {
  background-color: #eee;
  border: none;
  border-radius: 0;
  padding: 0.4rem 1rem;
  font-size: 1rem;  
  width:150px;
}

#search {
  color: #aaa;
  font-size: 1rem;
  border: none;
  margin-left: 6px;
  padding-right: 8px;
}
</style>