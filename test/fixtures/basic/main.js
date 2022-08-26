/* global t */
import noCommentAlert from './src/alert-no-comment';

t.notRegex(noCommentAlert.toString(), /alert\x20*\(['"]?[^'"\)\(]*['"]?\);?/);