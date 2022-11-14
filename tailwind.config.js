module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/navigation/**/*.{js,jsx,ts,tsx}',
    './src/screen/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins100: ['Poppins-Thin', 'sans-serif'],
        poppins200: ['Poppins-ExtraLigh', 'sans-serif'],
        poppins300: ['Poppins-Light', 'sans-serif'],
        poppins400: ['Poppins-Regular', 'sans-serif'],
        poppins500: ['Poppins-Medium', 'sans-serif'],
        poppins600: ['Poppins-SemiBold', 'sans-serif'],
        poppins700: ['Poppins-Bold', 'sans-serif'],
        poppins800: ['Poppins-ExtraBold', 'sans-serif'],
        poppins900: ['Poppins-Black', 'sans-serif'],
      },
      letterSpacing: {
        small: '0.5px',
        medium: '1px',
        large: '2px',
      },
      colors: {
        'main-blue': '#3366FF',
        'main-black': '#373A42',
        'main-gray': '#C1C5D0',
      },
    },
  },
  plugins: [],
};
