// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",  // 이게 핵심! src 폴더 안에 있는 모든 컴포넌트를 포함시켜줘야 함
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  