const _ = require('lodash');
const Color = require('color');

module.exports = function() {
    return ({ theme, e, addComponents }) => {
        const defaultBgColors = {};
        const pulseBgColors = theme('pulse.colors', defaultBgColors);

        function returnColorPair([modifier, value]) {

            const rgb = Color(value).rgb().array();
            const pulseModifier = modifier.replace(/^\./, '');
            return [
                `${modifier}`,
                {
                    boxShadow: "0 0 0 0 rgba(" + rgb[0] + ", " + rgb[1] +", " + rgb[2] + ", 1)",
                    transform: "scale(1)",
                    animation: `${pulseModifier} 2s infinite`
                }
            ];
        }

        function returnKeyFrames([modifier, value]) {
            const rgb = Color(value).rgb().array();
            const pulseModifier = modifier.replace(/^\./, '');
            return [
                `@keyframes ${pulseModifier}`,
                {
                    "0%": {
                        transform: "scale(0.95)",
                        boxShadow: "0 0 0 0 rgba(" + rgb[0] + ", " + rgb[1] +", " + rgb[2] + ", 0.7)"
                    },
                    "70%": {
                        transform: "scale(1)",
                        boxShadow: "0 0 0 10px rgba(" + rgb[0] + ", " + rgb[1] +", " + rgb[2] + ", 0)"
                    },
                    "100%": {
                        transform: "scale(0.95)",
                        boxShadow: "0 0 0 0 rgba(" + rgb[0] + ", " + rgb[1] +", " + rgb[2] + ", 0)"
                    }
                }
            ];
        }

        const allTheColors = _(pulseBgColors)
            .flatMap((value, modifier) => {
                if (typeof value == 'object') {
                    return _.map(value, (v, m) => {
                        return [`.${e(`pulse-${modifier}-${m}`)}`, v];
                    });
                }
                if (
                    typeof value == 'string' &&
                    value.length > 1 &&
                    value.charAt(0) == '#'
                ) {
                    return [[`.${e(`pulse-${modifier}`)}`, value]];
                }
                return [];
            })
            .value();

        const components = _.fromPairs(
            _.concat(
                _.map(allTheColors, (color, index) => {
                    return returnColorPair(color);
                }),
                _.map(allTheColors, (color, index) => {
                    return returnKeyFrames(color);
                })
            )
        );

        addComponents(components);
    };
};
