# Pulse Plugin for Tailwind CSS

## Inspired By

A kickass [Post](https://www.florin-pop.com/blog/2019/03/css-pulse-effect/) by [Florin Pop](https://www.florin-pop.com/) and [Materialize CSS](https://materializecss.com).

## Installation

```bash
npm install tailwindcss-pulse
```

## Usage

```js
// tailwind.config.js
{
  theme: {
    pulse: theme => ({
        colors: theme('colors'),
    }),
  },
  plugins: [
    require('tailwindcss-pulse')(),
  ],
}
```

The default configuration generates the following pulse effect for each color in your theme:

```css
...

.pulse-purple-300 {
    box-shadow: 0 0 0 0 rgba(214, 188, 250, 1);
    transform: scale(1);
    animation: pulse-purple-300 2s infinite
}

@keyframes pulse-purple-300 {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(214, 188, 250, 0.7)
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(214, 188, 250, 0)
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(214, 188, 250, 0)
    }
}

.shadow-pulse-purple-300 {
    filter: drop-shadow(0 0 0 rgba(214, 188, 250, .4));
    animation: shadow-pulse-purple-300 2s infinite
}

@keyframes shadow-pulse-purple-300 {
    0% {
        filter: drop-shadow(0 0 0 rgba(214, 188, 250, 0.6))
    }

    50% {
        filter: drop-shadow(0 0 .75rem rgba(214, 188, 250, 0.8))
    }
}

...
```

[![Build Status](https://travis-ci.org/jamessessford/tailwindcss-pulse.svg?branch=master)](https://travis-ci.org/jamessessford/tailwindcss-pulse)
[![Coverage Status](https://coveralls.io/repos/github/jamessessford/tailwindcss-pulse/badge.svg?branch=master)](https://coveralls.io/github/jamessessford/tailwindcss-pulse?branch=master)
