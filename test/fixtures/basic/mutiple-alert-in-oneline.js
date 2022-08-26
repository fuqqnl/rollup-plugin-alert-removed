import onelineAlerts from './src/oneline-alerts';

t.notRegex(onelineAlerts.toString(), /alert\x20*\(['"]?[^'"\)\(]*['"]?\);?/);