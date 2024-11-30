const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./src/**/*.{html,js}",
    flowbite.content(),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkbg: "#1E293B",
        defaultbg: "#155e75",
        appbg: "#0f766e",
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

