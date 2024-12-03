import flowbite from "flowbite-react/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      width: {
        30: "30%",
        70: "70%",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
