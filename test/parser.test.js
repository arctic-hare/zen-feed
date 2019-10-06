const parse = require('../modules/contentParser');
const cheerio = require('cheerio');
const sampleHtml = require('./sampleHtml');
const fs = require('fs');




describe('sanitizing', () => {
    fs.writeFileSync('sanitized.html', parse(sampleHtml));
    test('should return string', () => {
        expect(typeof parse(sampleHtml)).toBe('string');
    });
    test('should not contain divs', () => {
        const sanitized = parse(sampleHtml);
        let $ = cheerio.load(sanitized);
        let divs = $('div');
        expect(divs.length).toBe(0);
    });
    test.todo('should convert youtube iframe to link')
})