<script setup>

const links = ['Home', 'About Us', 'Careers', 'Contact', 'Help Center'];
</script>

<template>
    <v-footer
        color="white"
        elevation="24"
        
      >
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link"
            class="mx-2"
            color="black"
            rounded="xl"
            variant="text"
          >
            {{ link }}
          </v-btn>
          <v-col class="text-center mt-4" cols="12">
            {{ new Date().getFullYear() }} — <strong>Jobify</strong>
          </v-col>
          
        </v-row>
      </v-footer>
</template>