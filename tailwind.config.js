/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        info: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      minHeight: {
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium: "0 4px 25px -2px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        hard: "0 10px 40px -2px rgba(0, 0, 0, 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        glow: "0 0 15px rgba(59, 130, 246, 0.3)",
        "glow-green": "0 0 15px rgba(34, 197, 94, 0.3)",
        "glow-red": "0 0 15px rgba(239, 68, 68, 0.3)",
        "glow-purple": "0 0 15px rgba(139, 92, 246, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "fade-in-left": "fadeInLeft 0.6s ease-out",
        "fade-in-right": "fadeInRight 0.6s ease-out",
        "slide-in-up": "slideInUp 0.5s ease-out",
        "slide-in-down": "slideInDown 0.5s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "bounce-soft": "bounce 1s ease-in-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" },
        },
      },
      backdropBlur: {
        "4xl": "72px",
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
        colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
        900: "900ms",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [
    // カスタムプラグイン
    function ({ addUtilities, addComponents, addBase, theme }) {
      // ベーススタイル
      addBase({
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          fontFamily: theme("fontFamily.sans"),
          fontSize: theme("fontSize.base"),
          lineHeight: theme("lineHeight.relaxed"),
          color: theme("colors.gray.900"),
          backgroundColor: theme("colors.white"),
          transition: "background-color 0.3s ease, color 0.3s ease",
        },
        ".dark body": {
          color: theme("colors.gray.100"),
          backgroundColor: theme("colors.gray.900"),
        },
      });

      // コンポーネントスタイル
      addComponents({
        ".btn": {
          padding: `${theme("spacing.2")} ${theme("spacing.4")}`,
          borderRadius: theme("borderRadius.lg"),
          fontWeight: theme("fontWeight.medium"),
          transition: "all 0.2s ease",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: theme("spacing.2"),
          "&:focus": {
            outline: "none",
            ring: `2px solid ${theme("colors.blue.500")}`,
            ringOffset: "2px",
          },
        },
        ".btn-primary": {
          backgroundColor: theme("colors.blue.600"),
          color: theme("colors.white"),
          "&:hover": {
            backgroundColor: theme("colors.blue.700"),
            transform: "translateY(-1px)",
            boxShadow: theme("boxShadow.md"),
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        ".btn-secondary": {
          backgroundColor: theme("colors.gray.200"),
          color: theme("colors.gray.900"),
          "&:hover": {
            backgroundColor: theme("colors.gray.300"),
            transform: "translateY(-1px)",
          },
        },
        ".btn-success": {
          backgroundColor: theme("colors.green.600"),
          color: theme("colors.white"),
          "&:hover": {
            backgroundColor: theme("colors.green.700"),
            transform: "translateY(-1px)",
            boxShadow: theme("boxShadow.glow-green"),
          },
        },
        ".btn-danger": {
          backgroundColor: theme("colors.red.600"),
          color: theme("colors.white"),
          "&:hover": {
            backgroundColor: theme("colors.red.700"),
            transform: "translateY(-1px)",
            boxShadow: theme("boxShadow.glow-red"),
          },
        },
        ".card": {
          backgroundColor: theme("colors.white"),
          borderRadius: theme("borderRadius.xl"),
          boxShadow: theme("boxShadow.sm"),
          border: `1px solid ${theme("colors.gray.200")}`,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: theme("boxShadow.md"),
            transform: "translateY(-2px)",
          },
        },
        ".dark .card": {
          backgroundColor: theme("colors.gray.800"),
          borderColor: theme("colors.gray.700"),
        },
        ".card-interactive": {
          cursor: "pointer",
          "&:hover": {
            boxShadow: theme("boxShadow.lg"),
            transform: "translateY(-4px) scale(1.02)",
          },
          "&:active": {
            transform: "translateY(-2px) scale(1.01)",
          },
        },
        ".gradient-text": {
          background: `linear-gradient(135deg, ${theme("colors.blue.600")}, ${theme(
            "colors.purple.600"
          )})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
        ".glass-effect": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".dark .glass-effect": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      });

      // ユーティリティクラス
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-custom": {
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme("colors.gray.300"),
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme("colors.gray.400"),
          },
        },
        ".dark .scrollbar-custom": {
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme("colors.gray.600"),
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme("colors.gray.500"),
          },
        },
        ".text-balance": {
          textWrap: "balance",
        },
        ".text-pretty": {
          textWrap: "pretty",
        },
        ".animation-delay-75": {
          animationDelay: "75ms",
        },
        ".animation-delay-150": {
          animationDelay: "150ms",
        },
        ".animation-delay-200": {
          animationDelay: "200ms",
        },
        ".animation-delay-300": {
          animationDelay: "300ms",
        },
        ".animation-delay-500": {
          animationDelay: "500ms",
        },
        ".animation-delay-700": {
          animationDelay: "700ms",
        },
        ".animation-delay-1000": {
          animationDelay: "1000ms",
        },
      });
    },

    // フォーム関連のプラグイン
    function ({ addComponents, theme }) {
      addComponents({
        ".form-input": {
          appearance: "none",
          backgroundColor: theme("colors.white"),
          borderColor: theme("colors.gray.300"),
          borderWidth: "1px",
          borderRadius: theme("borderRadius.lg"),
          paddingTop: theme("spacing.3"),
          paddingRight: theme("spacing.4"),
          paddingBottom: theme("spacing.3"),
          paddingLeft: theme("spacing.4"),
          fontSize: theme("fontSize.base"),
          lineHeight: theme("lineHeight.6"),
          transition: "all 0.2s ease",
          "&:focus": {
            outline: "none",
            borderColor: theme("colors.blue.500"),
            ring: `2px solid ${theme("colors.blue.500")}20`,
            backgroundColor: theme("colors.blue.50"),
          },
          "&::placeholder": {
            color: theme("colors.gray.400"),
          },
        },
        ".dark .form-input": {
          backgroundColor: theme("colors.gray.800"),
          borderColor: theme("colors.gray.600"),
          color: theme("colors.white"),
          "&:focus": {
            backgroundColor: theme("colors.gray.700"),
            borderColor: theme("colors.blue.400"),
            ring: `2px solid ${theme("colors.blue.400")}20`,
          },
          "&::placeholder": {
            color: theme("colors.gray.500"),
          },
        },
        ".form-select": {
          appearance: "none",
          backgroundColor: theme("colors.white"),
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
          borderColor: theme("colors.gray.300"),
          borderWidth: "1px",
          borderRadius: theme("borderRadius.lg"),
          paddingTop: theme("spacing.3"),
          paddingRight: theme("spacing.10"),
          paddingBottom: theme("spacing.3"),
          paddingLeft: theme("spacing.4"),
          fontSize: theme("fontSize.base"),
          lineHeight: theme("lineHeight.6"),
          transition: "all 0.2s ease",
          "&:focus": {
            outline: "none",
            borderColor: theme("colors.blue.500"),
            ring: `2px solid ${theme("colors.blue.500")}20`,
          },
        },
        ".dark .form-select": {
          backgroundColor: theme("colors.gray.800"),
          borderColor: theme("colors.gray.600"),
          color: theme("colors.white"),
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%9ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          "&:focus": {
            borderColor: theme("colors.blue.400"),
            ring: `2px solid ${theme("colors.blue.400")}20`,
          },
        },
        ".form-checkbox": {
          appearance: "none",
          backgroundColor: theme("colors.white"),
          backgroundOrigin: "border-box",
          borderColor: theme("colors.gray.300"),
          borderWidth: "1px",
          borderRadius: theme("borderRadius.DEFAULT"),
          color: theme("colors.blue.600"),
          display: "inline-block",
          flexShrink: "0",
          height: theme("spacing.4"),
          paddingTop: "0",
          paddingRight: "0",
          paddingBottom: "0",
          paddingLeft: "0",
          printColorAdjust: "exact",
          userSelect: "none",
          verticalAlign: "top",
          width: theme("spacing.4"),
          transition: "all 0.2s ease",
          "&:focus": {
            outline: "none",
            ring: `2px solid ${theme("colors.blue.500")}20`,
          },
          "&:checked": {
            backgroundColor: "currentColor",
            borderColor: "transparent",
            backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e")`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          },
        },
        ".dark .form-checkbox": {
          backgroundColor: theme("colors.gray.800"),
          borderColor: theme("colors.gray.600"),
          "&:focus": {
            ring: `2px solid ${theme("colors.blue.400")}20`,
          },
        },
      });
    },
  ],
};
