// postcss.config.js

module.exports = {
    plugins: [
      require('@tailwindcss/postcss'), // 수정된 부분
      require('autoprefixer'), // 필요에 따라 추가
    ]
  };
  