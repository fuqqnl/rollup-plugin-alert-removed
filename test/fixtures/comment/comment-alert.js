/* global t */
import haveComment from "./src/have-comment";

// 看是不是还能匹配到alert

t.notRegex(haveComment.toString(), /alert\x20*\(['"]?[^'"\)\(]*['"]?\);?/);

