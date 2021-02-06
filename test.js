const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const pulsePlugin = require('./index.js');

const generatePluginCss = config => {
    return postcss(
        tailwindcss(
            _.merge(
                {
                    theme: {},
                    corePlugins: false,
                    plugins: [pulsePlugin()],
                },
                config
            )
        )
    )
        .process('@tailwind components', {
            from: undefined,
        })
        .then(result => {
            return result.css;
        });
};

expect.extend({
    toMatchCss: cssMatcher,
});

test('The plugin will generate nothing if no colors are available', () => {
    return generatePluginCss().then(css => {
        expect(css).toMatchCss(``);
    });
});

test('The plugin will generate nothing if a dud color is passed', () => {
    return generatePluginCss({
        theme: {
            pulse: {
                colors: {
                    random: 'thiscolordoesnotexist',
                },
            },
        },
    }).then(css => {
        expect(css).toMatchCss(``);
    });
});

test('The plugin works with named colors', () => {
    return generatePluginCss({
        theme: {
            pulse: {
                colors: {
                    dodgerblue: 'dodgerblue',
                },
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
            .pulse-dodgerblue {
                box-shadow: 0 0 0 0 rgba(30, 144, 255, 1);
                transform: scale(1);
                animation: pulse-dodgerblue 2s infinite
            }

            @keyframes pulse-dodgerblue {
                0% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(30, 144, 255, 0.7)
                }

                70% {
                    transform: scale(1);
                    box-shadow: 0 0 0 10px rgba(30, 144, 255, 0)
                }

                100% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(30, 144, 255, 0)
                }
            }
            `);
    });
});

test('The plugin will generate a requested colour', () => {
    return generatePluginCss({
        theme: {
            pulse: {
                colors: {
                    black: '#000',
                },
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
                .pulse-black {
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
                    transform: scale(1);
                    animation: pulse-black 2s infinite;
                }

                @keyframes pulse-black {
                    0% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
                    }
                    70% {
                        transform: scale(1);
                        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
                    }
                    100% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                    }
                }
            `);
    });
});

test('The plugin will generate a different colour', () => {
    return generatePluginCss({
        theme: {
            pulse: {
                colors: {
                    'purple-300': '#d6bcfa',
                },
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
                .pulse-purple-300 {
                    box-shadow: 0 0 0 0 rgba(214, 188, 250, 1);
                    transform: scale(1);
                    animation: pulse-purple-300 2s infinite;
                }

                @keyframes pulse-purple-300 {
                    0% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(214, 188, 250, 0.7);
                    }
                    70% {
                        transform: scale(1);
                        box-shadow: 0 0 0 10px rgba(214, 188, 250, 0);
                    }
                    100% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(214, 188, 250, 0);
                    }
                }
            `);
    });
});

test('The plugin will generate colors from a map', () => {
    return generatePluginCss({
        theme: {
            pulse: {
                colors: {
                    map: {
                        one: '#000',
                        two: '#fff',
                    },
                },
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
                .pulse-map-one {
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
                    transform: scale(1);
                    animation: pulse-map-one 2s infinite;
                }

                .pulse-map-two {
                    box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
                    transform: scale(1);
                    animation: pulse-map-two 2s infinite;
                }

                @keyframes pulse-map-one {
                    0% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
                    }
                    70% {
                        transform: scale(1);
                        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
                    }
                    100% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                    }
                }

                @keyframes pulse-map-two {
                    0% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
                    }
                    70% {
                        transform: scale(1);
                        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
                    }
                    100% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
                    }
                }
            `);
    });
});
