const test = require('ava');
const { rollup } = require('rollup');

const {alertCodeRemove} = require('../dist/index');


const execute = (code, context = {}, t) => {
    let fn;
    const contextKeys = Object.keys(context);
    const argNames = contextKeys.concat('module', 'exports', 't', code);
  
    try {
      fn = new Function(...argNames); // eslint-disable-line no-new-func
    } catch (err) {
      log(code);
      throw err;
    }
    const module = { exports: {} };
    const argValues = contextKeys.map((key) => context[key]).concat(module, module.exports, t);
  
    fn(...argValues);
  
    return module.exports;
  };
const getOutputFromGenerated = (generated) => (generated.output ? generated.output[0] : generated);

test('正确删除alet代码，不管alert代码块后面有没有<分号>', async (t) => {
    const bundle = await rollup({
      input: './test/fixtures/basic/main.js',
      plugins: [alertCodeRemove({
          include: /src/,
          exclude: /node_modules/
      })]
    });
    // 表示有1个断言
    t.plan(1);
    const {code} = getOutputFromGenerated(await bundle.generate({ format: 'cjs' }));
    execute(code, {}, t);
  });

  test('正确删除alet代码，不管alert代码块有连续多少行', async (t) => {
    const bundle = await rollup({
      input: './test/fixtures/basic/string-alert-mutilple.js',
      plugins: [alertCodeRemove({
          include: /src/,
          exclude: /node_modules/
      })]
    });
    t.plan(1);
    const {code} = getOutputFromGenerated(await bundle.generate({ format: 'es' }));
    execute(code, {}, t);
  });

  test('如果在一行中有多个alert代码块，也可以正常remove掉（应该没有人会这么写吧...）', async (t) => {
    const bundle = await rollup({
      input: './test/fixtures/basic/mutiple-alert-in-oneline.js',
      plugins: [alertCodeRemove({
          include: /src/,
          exclude: /node_modules/
      })]
    });
    t.plan(1);
    const {code} = getOutputFromGenerated(await bundle.generate({ format: 'es' }));
    execute(code, {}, t);
  });


  test('删除代码中，带有注释标识的alert', async (t) => {
    const bundle = await rollup({
      input: './test/fixtures/comment/comment-alert.js',
      plugins: [alertCodeRemove({
          include: /src/,
          exclude: /node_modules/
      })]
    });
    t.plan(1);
    const {code} = getOutputFromGenerated(await bundle.generate({ format: 'es' }));
    execute(code, {}, t);
  });


