const slugfy = require('../service/slugfy')

test('slugfy str kebab de carne', () => {
    expect(slugfy('kebab de carne')).toBe('kebab-de-carne')
})

test('slugfy str kebab de camarão com requeijão', () => {
    expect(slugfy('kebab de camarão com requeijão')).toBe('kebab-de-camarao-com-requeijao')
})