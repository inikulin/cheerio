var expect = require('expect.js'),
    fixtures = require('./fixtures'),
    $ = require('../');


describe('$', function () {

    describe('.html', function () {

        it('() : should return innerHTML; $.html(obj) should return outerHTML', function () {
            var $div = $('div', '<div><span>foo</span><span>bar</span></div>');
            var span = $div.children()[1];
            expect($(span).html()).to.equal('bar');
            expect($.html(span)).to.equal('<span>bar</span>');
        });

        it('(<obj>) : should accept an object, an array, or a cheerio object', function () {
            var $span = $('<span>foo</span>');
            expect($.html($span[0])).to.equal('<span>foo</span>');
            expect($.html($span)).to.equal('<span>foo</span>');
        });

        it('(<value>) : should be able to set to an empty string', function () {
            var $elem = $('<span>foo</span>').html('');
            expect($.html($elem)).to.equal('<span></span>');
        });

        it('() : of empty cheerio object should return null', function () {
            expect($().html()).to.be(null);
        });

        it('(selector) : should return the outerHTML of the selected element', function () {
            var _$ = $.load(fixtures.fruits);
            expect(_$.html('.pear')).to.equal('<li class="pear">Pear</li>');
        });

        it('(element with attr that contains double quotes) : should return the outerHTML of the selected element with single quoted attr', function () {
            var _$ = $.load('<li class=\'pear"\'></li>');
            expect(_$.html()).to.equal('<html><head></head><body><li class=\'pear"\'></li></body></html>');
        });

        it('(element with attr that contains single quotes) : should return the outerHTML of the selected element with double quoted attr', function () {
            var _$ = $.load('<li class="pear\'"></li>');
            expect(_$.html()).to.equal('<html><head></head><body><li class="pear\'"></li></body></html>');
        });
    });


    describe('.loadDocument', function () {

        it('(html) : should retain original root after creating a new node', function () {
            var $html = $.load('<body><ul id="fruits"></ul></body>');
            expect($html('body')).to.have.length(1);
            $html('<script>');
            expect($html('body')).to.have.length(1);
        });
    });


    describe('.clone', function () {

        it('() : should return a copy', function () {
            var $src = $('<div><span>foo</span><span>bar</span><span>baz</span></div>').children();
            var $elem = $src.clone();
            expect($elem.length).to.equal(3);
            expect($elem.parent().length).to.equal(1);
            expect($elem.parent()[0].type).to.equal('root');
            expect($elem.text()).to.equal($src.text());
            $src.text('rofl');
            expect($elem.text()).to.not.equal($src.text());
        });

    });

    describe('.root', function () {

        it('() : should return a cheerio-wrapped root object', function () {
            var $html = $.load('<div><span>foo</span><span>bar</span></div>');
            $html.root().append('<div id="test"></div>');
            expect($html.html()).to.equal('<html><head></head><body><div><span>foo</span><span>bar</span></div></body></html><div id="test"></div>');
        });

    });

});
