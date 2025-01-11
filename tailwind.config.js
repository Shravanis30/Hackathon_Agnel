// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// module exports = {
//   content: [
//     "./src/*/.{html,js,ts,jsx,tsx}",
//     "./node_modules/@ionic/*/.{html,js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',  // for HTML files
    './src/**/*.{js,jsx,ts,tsx}',  // for React or TypeScript files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Blue theme color
        secondary: '#3B82F6',
      },
    },
  },
  plugins: [],
};
