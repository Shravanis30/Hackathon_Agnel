

// export default {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       keyframes: {
//         shimmer: {
//           "0%": { transform: "translateX(-100%)" },
//           "100%": { transform: "translateX(100%)" },
//         },
//       },
//       animation: {
//         shimmer: "shimmer 1.5s infinite linear",
//       },
//     },
//   },
//   plugins: [],
// };



export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
        fadeIn: "fadeIn 1s ease-out", // Added fadeIn animation
      },
    },
  },
  plugins: [],
};

