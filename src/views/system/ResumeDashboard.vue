<script setup>

import JobNavigationLayout from "@/components/layout/navigation/JobNavigationLAyout.vue";
<<<<<<< HEAD
import ResumeDashboardsWidget from "@/components/widget/ResumeDashboardsWidget.vue";
=======
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from "@/stores/authUser";

const resumeFile = ref(null);
const fileName = ref("");
const fileInput = ref(null);
const resumeUrl = ref("");
const loading = ref(true);
const isDragging = ref(false); // Track dragging state

const authStore = useAuthUserStore();


const user_name = `${authStore.userData.first_name || ''} ${authStore.userData.last_name || ''}`;

// Supabase bucket and file details
const bucketName = "resumes"; // Replace with your Supabase bucket name
const filePath = `${user_name}.pdf`; // Use user name and unique UUID

// Fetch existing resume by ID (filePath)
// Fetch existing resume URL
const fetchResume = async () => {
  try {
    loading.value = true;

    // Generate the file path (replace with a user-specific file path logic)
    // Example: const filePath = `${userId}/resume.pdf`;
    const { data, error } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath); // Correct use of getPublicUrl

    if (error) {
      throw new Error(error.message);
    }

    if (data.publicUrl) {
      resumeUrl.value = data.publicUrl; // Set resume URL to the fetched public URL
      console.log(resumeUrl)
    } else {
      resumeUrl.value = ""; // File not found
    }
  } catch (error) {
    console.error("Error fetching resume:", error.message);
    resumeUrl.value = ""; // Clear URL on error
  } finally {
    loading.value = false;
  }
};


// Handle file selection
const handleFileUpload = () => {
  if (fileInput.value?.files[0]) {
    processFile(fileInput.value.files[0]);
  }
};

// Handle file drop
const handleDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;
  if (event.dataTransfer.files[0]) {
    processFile(event.dataTransfer.files[0]);
  }
};

// Process the selected or dropped file
const processFile = (file) => {
  resumeFile.value = file;
  fileName.value = file.name;
};

// Upload file to Supabase
const uploadResume = async () => {
  if (!resumeFile.value) return;

  try {
    loading.value = true;
    const { error } = await supabase.storage
      .from('resumes')
      .upload(filePath, resumeFile.value, {
        cacheControl: "3600",
        upsert: true,
        contentType: "application/pdf",
      });

    if (error) throw error;

    await fetchResume(); // Refresh to show the uploaded file
    alert("Resume uploaded successfully!");
  } catch (error) {
    console.error("Error uploading resume:", error.message);
    alert("Failed to upload resume. Please try again.");
  } finally {
    loading.value = false;
  }
};

// Delete the resume
const deleteResume = async () => {
  try {
    const { error } = await supabase.storage.from(bucketName).remove([filePath]);

    if (error) throw error;

    resumeFile.value = null;
    fileName.value = "";
    resumeUrl.value = "";
    alert("Resume deleted successfully!");
  } catch (error) {
    console.error("Error deleting resume:", error.message);
    alert("Failed to delete resume. Please try again.");
  }
};

// Fetch resume on component mount
onMounted(() => {
  fetchResume();
});
>>>>>>> feat/employer-information
</script>

<template>
  <JobNavigationLayout>
    <template #content>

      <ResumeDashboardsWidget />

     </template> 
     
  
  </JobNavigationLayout>
</template>


