<template>
   <v-form fast-fail @submit.prevent>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Firstname"
                      variant="outlined"
                    ></v-text-field
                  ></v-col>
                  <v-col>
                    <v-text-field
                      label="Lastname"
                      variant="outlined"
                    ></v-text-field
                  ></v-col>
                </v-row>

                <v-text-field label="Email" variant="outlined"></v-text-field>

                <v-text-field
                  label="Password"
                  type="password"
                  variant="outlined"
                >
                </v-text-field>
                <v-text-field
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                >
                </v-text-field>

                <v-btn class="mt-2 bg-primary" type="submit" block prepend-icon="mdi-account-plus">Submit</v-btn>
              </v-form>

</template>