<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 4px;
  margin: 0.5rem auto;
  max-width: 360px;
  border: 1px #cccccc solid;
  background: white;
}

@media screen and (min-width: 400px) and (max-width: 700px) {
  .card {
    max-width:410px;
  }
} 
</style>
