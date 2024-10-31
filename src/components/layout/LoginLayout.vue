<script setup>

</script>

<template>
  <!-- toggle switch app bar login main -->
  <v-responsive class="border rounded"  >
    <v-app :theme="theme" class="d-flex flex-column fill-height">

      <v-main class="d-flex flex-column flex-grow-1 pt-8" >
        <v-container >
          <slot name="content"></slot>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
