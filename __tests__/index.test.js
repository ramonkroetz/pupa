import pupa from '../index.js'

describe('pupa-browser', () => {
    it('main', () => {
        // Normal placeholder
        expect(pupa('{foo}', {foo: '!'})).toBe('!')
        expect(pupa('{foo}', {foo: 10})).toBe('10')
        expect(pupa('{foo}', {foo: 0})).toBe('0')
        expect(pupa('{foo}{foo}', {foo: '!'})).toBe('!!')
        expect(pupa('{foo}{bar}{foo}', {foo: '!', bar: '#'})).toBe('!#!')
        expect(pupa('yo {foo} lol {bar} sup', {foo: '🦄', bar: '🌈'})).toBe('yo 🦄 lol 🌈 sup')
        expect(pupa('{foo}{deeply.nested.valueFoo}', {
            foo: '!',
            deeply: {
                nested: {
                    valueFoo: '#'
                }
            }
        })).toBe('!#')
        expect(pupa('{0}{1}', ['!', '#'])).toBe('!#')

        // Encoding HTML Entities to avoid code injection
        expect(pupa('{{foo}}', {foo: '!'})).toBe('!')
        expect(pupa('{{foo}}', {foo: 10})).toBe('10')
        expect(pupa('{{foo}}', {foo: 0})).toBe('0')
        expect(pupa('{{foo}}{{foo}}', {foo: '!'})).toBe('!!')
        expect(pupa('{foo}{{bar}}{foo}', {foo: '!', bar: '#'})).toBe('!#!')
        expect(pupa('yo {{foo}} lol {{bar}} sup', {foo: '🦄', bar: '🌈'})).toBe('yo 🦄 lol 🌈 sup')
        expect(pupa('{foo}{{deeply.nested.valueFoo}}', {
            foo: '!',
            deeply: {
                nested: {
                    valueFoo: '<br>#</br>'
                }
            }
        })).toBe('!&lt;br&gt;#&lt;/br&gt;')
        expect(pupa('{{0}}{{1}}', ['!', '#'])).toBe('!#')
        expect(pupa('{{0}}{{1}}', ['<br>yo</br>', '<i>lol</i>'])).toBe('&lt;br&gt;yo&lt;/br&gt;&lt;i&gt;lol&lt;/i&gt;')
    })

    it('do not match non-identifiers', () => {
        const fixture = '"*.{json,md,css,graphql,html}"'
	    expect(pupa(fixture, [])).toBe(fixture)
    })
})
