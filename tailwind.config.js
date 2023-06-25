/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'footer-bg' : "url('src/assets/images/footer.png')"
      }
    }
  },
  plugins: [],
}

