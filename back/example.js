//Arquivo para modelagem de página 
const home_content = {
    banner =[
        {
            product_banner_photo = "",
            product = fk,
            direction = "L|R",
            order = 1 //lembrar que é um number
        }
    ],
    infos =[
        {
            icon: "",
            text: "",
            link: "",
            order = 1
        }
    ],
    about = {
        photo: "",
        title: "",
        description: "",
        direction = "L|R"
    },
    component_services = {
        title: "",
        description: "",
        service =[
            {
                photo: "",
                description: "",
                order = 1
            }
        ]
    }
}

//regra de negocio de discount price nao ser mais de 10%
const product = {
    photo: "",
    title: "",
    category: fk,
    highlight: Boolean,
    description: "",
    complete_description: "",
    price: "",
    discount_price: "",  //nao quero colocar
    discount_price_percent: "",
    last_modified_by: user_fk,  //quem foi q modificou
    last_modification_date: Date, //momento da modificaçao
    status: Boolean
}

const category = {
    icon: "",
    name: "",
    status: Boolean
}

const user = {
    email: "",
    password: ""
}
