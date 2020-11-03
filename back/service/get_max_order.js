function get_max_order(content, type) {
    let x = null
    if (type == 'service'){
        x = content.services.service
    }
    if (type == 'infos'){
        x = content.infos
    }
    if (type == 'banner'){
        x = content.banner
    }
    x.sort(function(a, b) { return b.order - a.order})
    return x[0].order + 1
}


module.exports = get_max_order
