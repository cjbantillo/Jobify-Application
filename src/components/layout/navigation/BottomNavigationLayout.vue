
<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-about">
        <h3>About Jobify</h3>
        <p>
          Jobify connects talent with opportunity. Whether you're looking for
          your dream job or the perfect candidate, we've got you covered.
          Join our platform and explore a world of opportunities!
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
          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 Jobify. All rights reserved.</p>
    </div>
  </footer>
</template>


<style scoped>
.footer {
  background-color: #4caf50;
  color: white;
  padding: 20px 0;
  font-family: Arial, sans-serif;
}

.footer-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.footer-about,
.footer-links,
.footer-social {
  flex: 1 1 30%;
  margin: 10px;
}

.footer h3 {
  margin-bottom: 10px;
}

.footer p {
  font-size: 14px;
  line-height: 1.5;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: white;
  text-decoration: none;
  font-size: 14px;
}

.footer-links a:hover {
  text-decoration: underline;
}

.footer-social .social-icons {
  display: flex;
  gap: 10px;
}

.footer-social a {
  color: white;
  font-size: 18px;
  text-decoration: none;
}

.footer-social a:hover {
  opacity: 0.8;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 10px;
}
</style>
