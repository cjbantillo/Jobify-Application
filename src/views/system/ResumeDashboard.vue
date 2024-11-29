<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// import { useAuthUserStore } from '@/stores/authUser'
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue'

// Router and store instances
// const router = useRouter()
// const authStore = useAuthUserStore()

const resumeFile = ref(null)
const fileName = ref('')

const handleFileUpload = event => {
  resumeFile.value = event.target.files[0]
  fileName.value = resumeFile.value ? resumeFile.value.name : ''
  console.log('Uploaded file:', resumeFile.value)
}

const deleteResume = () => {
  resumeFile.value = null
  fileName.value = ''
  console.log('Resume deleted')
}

const viewResume = () => {
  if (resumeFile.value) {
    const fileURL = URL.createObjectURL(resumeFile.value)
    window.open(fileURL)
  } else {
    console.log('No resume uploaded')
  }
}

// const goToSettings = () => {
//   router.push('/settings')
// }
</script>

<template>
  <JobNavigationLayout>
    <template #content>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" xl="8">
            <v-card class="pa-8 hover-card move-down">
              <v-card-title class="title">Resume</v-card-title>
              <v-card-subtitle class="subtitle"
                >Manage your resume easily and keep track of your
                applications.</v-card-subtitle
              >
              <v-card-text>
                <div class="upload-section">
                  <h3>Upload Your Resume</h3>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style="display: none"
                    ref="fileInput"
                    @change="handleFileUpload"
                  />
                  <v-btn
                    color="#4caf50"
                    outlined
                    @click="$refs.fileInput.click()"
                    >Choose a file</v-btn
                  >
                  <div v-if="fileName" class="file-name">
                    Selected file: {{ fileName }}
                  </div>
                  <div class="upload-actions" v-if="resumeFile">
                    <v-btn color="#4caf50" outlined @click="viewResume"
                      >View Resume</v-btn
                    >
                    <v-btn color="error" outlined @click="deleteResume"
                      >Delete Resume</v-btn
                    >
                  </div>
                </div>

                <v-divider class="my-4"></v-divider>

                <div class="info-section">
                  <h3>Welcome to Your Resume</h3>
                  <p>
                    Here, you can upload your resume, view and delete it as
                    needed. Keep track of your professional journey efficiently.
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </JobNavigationLayout>
</template>

<style scoped>
.v-list-item:hover {
  background-color: #4caf50;
  color: white;
}

.hover-card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
}

.move-down {
  margin-top: 60px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
}

.upload-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.upload-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.file-name {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #333;
}

.info-section {
  margin-top: 2rem;
  text-align: center;
}

.info-section h3 {
  margin-bottom: 1rem;
}

.info-section p {
  margin: 0;
  color: #666;
}
</style>
