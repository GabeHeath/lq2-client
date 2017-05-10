import {JSDOM} from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const win = dom.defaultView;


const { window } = new JSDOM(win);
const { document } = new JSDOM(dom);

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

chai.use(chaiImmutable);