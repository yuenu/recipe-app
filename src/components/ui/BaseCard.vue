<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 4px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26); */
  /* padding: 0.2rem; */
  margin: 0.5rem auto;
  max-width: 500px;
  border: 1px #cccccc solid;
  background: white;
}
</style>
