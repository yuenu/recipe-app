<template>
  <div>
    <teleport to="body">
      <div v-if="show"
           class="popup-container"
           id="popup-container">
        <div class="popup">
          <button @click="tryClose"
                  class="close-popup"
                  id="close-popup">
            <font-awesome-icon icon="times"
                               size="lg" />
          </button>
          <div class="meal-info">
            <div class="popup-item">
              <h1>{{ mealName }}</h1>
            </div>
            <div class="popup-item">
              <img :src="mealImageUrl"
                   alt="">
            </div>
            <div class="popup-item">
              <p class="info-text">{{ mealInfo }}</p>
            </div>
            <div class="popup-item">
              <h3>Ingriendents:</h3>
            </div>
            <div class="popup-item">
              <ul class="ingriendent">
                <li v-for="(ingrendient,index) in mealIngrendients"
                    :key="index">
                  {{ ingrendient }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
    mealName: {
      type: String,
      required: true,
    },
    mealInfo: {
      type: String,
      required: false,
      default: "null",
    },
    mealIngrendients: {
      type: Array,
      required: false,
      default: () => [],
    },
    mealImageUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    tryClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.popup-container {
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
}

.popup-container.hidden {
  opacity: 0;
  pointer-events: none;
}

.popup {
  background-color: #fff;
  width: 100%;
  padding: 2rem;
  border-radius: 5px;
  position: relative;
  max-width: 600px;
  max-height: 90vh;
  overflow: auto;
}

.popup-item {
  margin-bottom: 1rem;
}

button {
  position: absolute;
  background-color: transparent;
  font-size: 2rem;
  top: 1.5rem;
  right: 1.5rem;
  border: none;
  outline: none;
  cursor: pointer;
}

img {
  object-fit: cover;
  width: 100%;
}

.meal-info h1 {
  text-align: center;
  color: rgb(63, 161, 241);
}

.info-text {
  font-size: 1rem;
  line-height: 1.6rem;
}

.ingriendent {
  margin-left: 2rem;
}

.ingriendent li {
  padding: 5px;
}
</style>