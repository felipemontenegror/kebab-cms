const get_max_order = require('../service/get_max_order')
const Content = require('../models/content');
const { setupDB } = require('../test-setup')

setupDB()

test('Should retrieve the max order of infos, banner or services', async () => {
    const content = await Content.findOne({})
    expect(get_max_order(content, 'infos')).toBe(1)
  })
