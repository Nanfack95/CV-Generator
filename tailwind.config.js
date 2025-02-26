/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}", // Définit les fichiers à scanner pour les classes CSS
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1D4ED8', // Exemple de couleur personnalisée
          secondary: '#9333EA',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'], // Personnalisation des polices
        },
        spacing: {
          '128': '32rem', // Valeurs personnalisées pour les marges et paddings
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'), // Plugin utile pour les formulaires
      require('@tailwindcss/typography'), // Plugin pour la typographie avancée
    ],
  };
  