var expect = require('expect.js'),
    $ = require('../');

// Templates
var templateInSelect = '<select><template><option></option></template></select>',
    templateInTable = '<table><template><tr></tr></template></table>',
    forgivingParsing1 = '<td>Yo</td>',
    forgivingParsing2 = '<option>Yo</option>';

describe('templates', function () {

    it('should make <template> content inaccessible for selectors', function () {
        var $select = $(templateInSelect),
            $tmpl = $select.find('template');

        expect($select.find('option').length).to.be(0);
        expect($tmpl[0].childNodes[0].childNodes[0].tagName).to.be('option');
    });

    it('should parse and serialize templates correctly', function () {
        expect($(templateInSelect).html()).to.be('<template><option></option></template>');
        expect($(templateInTable).html()).to.be('<template><tr></tr></template>');
    });

    it('should perform templates-powered forgiving parsing', function () {
        var $td = $(forgivingParsing1),
            $option = $(forgivingParsing2);

        expect($td.html()).to.be('Yo');
        expect($option.html()).to.be('Yo');
    });
});
