/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4285F4", // Google Blue
          dark: "#3367D6",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // for nice form styling
    require("@tailwindcss/typography"), // if you have blogs or content
    require("tailwindcss-animate"), // for smooth animations (used in shadcn/ui)
  ],
}
