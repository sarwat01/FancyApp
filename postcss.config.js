module.exports = {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ['last 2 versions'], // Adjust to your preferred browsers
        grid: true,
        flexbox: 'no-2009', // Optional, helps with flexbox issues
        warnings: false, // This will disable warnings
      },
    },
  };
  