<script>
export default {
  props: {
    theme: {
      type: String,
      default: "light",
    },
  },
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>

<template>
  <!-- toggle switch app bar login main -->
  <v-responsive class="border rounded"  >
    <v-app :theme="theme" class="d-flex flex-column fill-height">

      <v-main class="d-flex flex-column flex-grow-1 pt-8" >
        <v-container >
          <v-btn
            class="back-btn"
            @click="goBack"
          >
          <v-icon left>mdi-arrow-left</v-icon>
          </v-btn>
          <slot name="content"></slot>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
<style>
  .back-btn{
    background: transparent;
    color: #4caf50;
    border: none;
    box-shadow: none;
    font-size: 30px
  }
  .back-btn:hover{
    background: none;
    border: none;
    box-shadow: none;
  }
</style>
