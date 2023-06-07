/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },

    daisyui: {
        themes: [
            {
                mytheme: {     
                    primary: "#27374D",      
                    secondary: "#526D82",     
                    accent: "#9DB2BF",     
                    neutral: "#DDE6ED",     
                    "base-100": "#e1f4f5",     
                    info: "#0CA5E9",     
                    success: "#22c55e",    
                    warning: "#F4BF50",     
                    error: "#e11d48",
                },
            },
        ],
    },

    plugins: [require("daisyui")],
};
