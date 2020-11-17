const Content = require('../models/content');
const { setupDB } = require('../test-setup')

setupDB()

const data = {
    about: {
        photo: "path/dummie",
        title: "TESTE",
        description: "TEST",
        direction: "RIGHT"
    },
    services: {
        title: "Meus Serviços teste",
        description: "TESTE",
        service: [],
    },
    footer: [],
    banner: [],
    infos: [],
}

test('Should save mock Content', async done => {
    const content = new Content( data )
    await content.save()
    expect(content == null).toBe(false)
    done()
  })
