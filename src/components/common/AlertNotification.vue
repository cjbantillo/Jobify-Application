<script setup>
import { ref, watch } from 'vue'
const props = defineProps(['formSuccessMessage', 'formErrorMessage']);
const dialogVisible = ref(false);

// Watch for changes in props and show the dialog if a message exists
watch(
  () => [props.formSuccessMessage, props.formErrorMessage],
  ([successMessage, errorMessage]) => {
    if (successMessage || errorMessage) {
      dialogVisible.value = true;
    }
  }
);

// Function to close the dialog
const closeDialog = () => {
  dialogVisible.value = false;
};
</script>

<template>
  <v-dialog v-model="dialogVisible" max-width="400px">
    <v-card>
      <v-card-title class="headline">
        {{ props.formSuccessMessage ? 'Success!' : 'Error!' }}
      </v-card-title>
      <v-card-text>
        {{ props.formSuccessMessage || props.formErrorMessage }}
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
