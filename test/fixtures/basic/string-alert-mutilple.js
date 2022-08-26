import stirngAlert from './src/alert-no-comment-mutiple';

t.notRegex(stirngAlert.toString(), /alert\x20*\(['"]?[^'"\)\(]*['"]?\);?/);