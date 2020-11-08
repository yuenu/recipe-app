<template>
  <div>
    <base-card>
      <div class="category">
        <h2>食譜目錄</h2>
        <div class="cateogries">
          <ul class="cat-meals">
            <li data-cat="Seafood"
                @click="getCategory"><img src="../../assets/category/seafood.png"
                   alt="Honey Yogurt Cheesecake"><span>Seafood</span></li>
            <li data-cat="chicken"
                @click="getCategory"><img src="../../assets/category/chicken.jpg"
                   alt="Cajun spiced fish tacos"><span>Chicken</span></li>
            <li data-cat="dessert"
                @click="getCategory"><img src="../../assets/category/dessert.jpg"
                   alt="Sweet and Sour Pork"><span>Dessert</span></li>
            <li data-cat="pasta"
                @click="getCategory"><img src="../../assets/category/pasta.jpg"
                   alt="Sweet and Sour Pork"><span>Pasta</span></li>
            <li data-cat="Vegetarian"
                @click="getCategory"><img src="../../assets/category/vegetarian.png"
                   alt="Sweet and Sour Pork"><span>Vegetarian</span></li>
          </ul>

        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  emits: ["get-cat"],
  data() {
    return {
      index: 0,
      slides: [],
    };
  },
  computed: {
    slidesLength() {
      return this.slides.length;
    },
  },
  methods: {
    getCategory(el) {
      const cat = el.currentTarget.getAttribute("data-cat");
      this.$emit("get-cat", cat);
    },
  },
};
</script>


<style scoped>
h2 {
  margin-top: 10px;
  text-align: center;
}

.cateogries {
  margin: 20px 0;
  padding: 10px;
  background-color: lightgoldenrodyellow;
  position: relative;
  overflow: hidden;
}

.cat-meals {
  display: flex;
}

.cat-meals li {
  list-style: none;
}

.cat-meals li img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 10px 2px #3333331a;
  border: 2px #c3c3c3 solid;
  cursor: pointer;
  background-color: white;
}

.cat-meals li img:hover {
  border: 2px rgb(255, 114, 126) solid;
  transform: scale(1.1);
}

.cat-meals li span {
  display: inline-block;
  font-size: 0.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 75px;
  text-align: center;
  transform: translateX(-5%);
}
</style>	