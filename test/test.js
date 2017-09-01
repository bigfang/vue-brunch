import test from 'ava';
import VueBrunch from '..';

const plugin = new VueBrunch;

test('can compile', t => {

    const file = {data: '<template><h1>Hello World!</h1></template><script>export default {name: \'helloWorld\'};</script>', path: 'views/test.vue'};

    return plugin.compile(file).then((result) => {
        t.true(result.length > 0);
    });
});
