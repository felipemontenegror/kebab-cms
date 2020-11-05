const get_max_order = require('../service/get_max_order')
const Content = require('../models/content')

test('empty content in an specific', async () => {
    let content = await Content.findOne({ _id : '5f9b2d8df3645418e4a615d9'})
    type = 'infos'
    expect(get_max_order(content, type)).toBe(1)

})