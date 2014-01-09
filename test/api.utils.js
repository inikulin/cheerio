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

        it('(element with attrs that contains quotes) : should return the outerHTML with encoded quotes in attributes', function () {
            var _$ = $.load('<li class=\'&#39;pear"\' style="test\'&quot;"></li>');
            expect(_$.html()).to.equal('<html><head></head><body><li class="&#39;pear&quot;" style="test&#39;&quot;"></li></body></html>');
        });

        it('(element that contains escaped HTML in inner text) : should be rendered correctly with escaped text', function () {
            var _$ = $.load('<div>&lt;span&gt; A&amp;B &lt;span&gt;</div>');
            expect(_$.html()).to.equal('<html><head></head><body><div>&lt;span&gt; A&amp;B &lt;span&gt;</div></body></html>');
        });

        it('(element that contains html-escapable symbols in script and style) : should remain unescaped', function () {
            var _$ = $.load('<script>var a = 3>2&&1;</script><style>&seletor{}</style>');
            expect(_$.html()).to.equal('<html><head><script>var a = 3>2&&1;</script><style>&seletor{}</style></head><body></body></html>');
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

// <<<<<<< HEAD
    describe('.root', function () {
// =======
//     it('(html) : should handle the `normalizeWhitepace` option', function() {
//       var $html = $.load('<body><b>foo</b>  <b>bar</b></body>', { normalizeWhitespace : true });
//       expect($html.html()).to.be('<body><b>foo</b> <b>bar</b></body>');
//     });
// >>>>>>> cheerio/master

        it('() : should return a cheerio-wrapped root object', function () {
            var $html = $.load('<div><span>foo</span><span>bar</span></div>');
            $html.root().append('<div id="test"></div>');
            expect($html.html()).to.equal('<html><head></head><body><div><span>foo</span><span>bar</span></div></body></html><div id="test"></div>');
        });

// <<<<<<< HEAD
// =======
//   });
// 
// 
//   describe('.clone', function() {
// 
//     it('() : should return a copy', function() {
//       var $src = $('<div><span>foo</span><span>bar</span><span>baz</span></div>').children();
//       var $elem = $src.clone();
//       expect($elem.length).to.equal(3);
//       expect($elem.parent()).to.have.length(0);
//       expect($elem.text()).to.equal($src.text());
//       $src.text('rofl');
//       expect($elem.text()).to.not.equal($src.text());
//     });
// 
//   });
// 
//   describe('.parseHTML', function() {
// 
//     it('() : returns null', function() {
//       expect($.parseHTML()).to.equal(null);
//     });
// 
//     it('(null) : returns null', function() {
//       expect($.parseHTML(null)).to.equal(null);
//     });
// 
//     it('("") : returns null', function() {
//       expect($.parseHTML('')).to.equal(null);
//     });
// 
//     it('(largeHtmlString) : parses large HTML strings', function() {
//       var html = new Array(10).join('<div></div>');
//       var nodes = $.parseHTML(html);
// 
//       expect(nodes.length).to.be.greaterThan(4);
//       expect(nodes).to.be.an('array');
//     });
// 
//     it('("<script>") : ignores scripts by default', function() {
//       var html = '<script>undefined()</script>';
//       expect($.parseHTML(html)).to.have.length(0);
//     });
// 
//     it('("<script>", true) : preserves scripts when requested', function() {
//       var html = '<script>undefined()</script>';
//       expect($.parseHTML(html, true)[0].name).to.match(/script/i);
//     });
// 
//     it('("scriptAndNonScript) : preserves non-script nodes', function() {
//       var html = '<script>undefined()</script><div></div>';
//       expect($.parseHTML(html)[0].name).to.match(/div/i);
//     });
// 
//     it('(scriptAndNonScript, true) : Preserves script position', function() {
//       var html = '<script>undefined()</script><div></div>';
//       expect($.parseHTML(html, true)[0].name).to.match(/script/i);
//     });
// 
//     it('(text) : returns a text node', function() {
//       expect($.parseHTML('text')[0].type).to.be('text');
//     });
// 
//     it('(\\ttext) : preserves leading whitespace', function() {
//       expect($.parseHTML('\t<div></div>')[0].data).to.equal('\t');
//     });
// 
//     it('( text) : Leading spaces are treated as text nodes', function() {
//       expect($.parseHTML(' <div/> ')[0].type).to.be('text');
//     });
// 
//     it('(html) : should preserve content', function() {
//       var html = '<div>test div</div>';
//       expect($($.parseHTML(html)[0]).html()).to.equal('test div');
//     });
// 
//     it('(malformedHtml) : should not break', function() {
//       expect($.parseHTML('<span><span>')).to.have.length(1);
//     });
// 
//     it('(garbageInput) : should not cause an error', function() {
//       expect($.parseHTML('<#if><tr><p>This is a test.</p></tr><#/if>') || true).to.be.ok();
//     });
// 
//   });
// 
//   describe('.root', function() {
// 
//     it('() : should return a cheerio-wrapped root object', function() {
//       var $html = $.load('<div><span>foo</span><span>bar</span></div>');
//       $html.root().append('<div id="test"></div>');
//       expect($html.html()).to.equal('<div><span>foo</span><span>bar</span></div><div id="test"></div>');
// >>>>>>> cheerio/master
    });

});
