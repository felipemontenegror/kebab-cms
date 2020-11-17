const Category = require('../models/category');
const { setupDB } = require('../test-setup')

setupDB()

const data = {
    name: `TEST ${Math.floor(Math.random() * Math.floor(100))}`,
    icon: "https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Lollipop-512.png" //dado falso
}

test('Should save mock category', async done => {
    const category = new Category( data )
    await category.save()
    expect(category).toBeTruthy()
    done()
  })
