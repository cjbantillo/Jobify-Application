<script setup>
  import logo from '@/assets/logo-removebg-preview.png'
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-about">
        <h3 class=" inline-flex">About 
          <v-img
            :src="logo"
            alt="Logo"
            max-height="80"
            max-width="100"
            class="mr-4"
          />
        </h3>
        <p>
          StuGiG connects talent with opportunity. Whether you're looking for
          your dream job or the perfect candidate, we've got you covered. Join
          our platform and explore a world of opportunities!
        </p>
      </div>

      <div class="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/faq">FAQs</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>

      <div class="footer-social">
        <h3>Follow Us</h3>
        <div class="social-icons">
          <a href="#" aria-label="Facebook"
            ><i class="fa-brands fa-facebook-f"></i
          ></a>
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="LinkedIn"
            ><i class="fab fa-linkedin-in"></i
          ></a>
          <a href="#" aria-label="Instagram"
            ><i class="fab fa-instagram"></i
          ></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 StuGiG. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped src="./css/BottomNavigationLayoutStyle.css"></style>

