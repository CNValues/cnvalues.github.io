$(document).ready(() => {

    let econ_arr = ["共产主义", "社会主义", "偏向平等", "中立", "偏向市场", "资本主义", "自由放任"]
    let govt_arr = ["无政府主义", "自由意志主义", "偏向自由", "中立", "偏向专制", "威权主义", "极权主义"]
    let scty_arr = ["变革", "进步", "偏向改良", "中立", "偏向保守", "传统", "反动"]
    let envo_arr = ["深绿", "生态主义", "环保优先", "中立", "发展优先", "生产主义", "环保怀疑主义"]

    initialize();

    $('.fixed-action-btn').floatingActionButton();
    $('.tooltipped').tooltip();
    $('.modal').modal();

    function get_label(val, ary) {
        if (val > 100) {
            return ""
        } else if (val > 90) {
            return ary[0]
        } else if (val > 75) {
            return ary[1]
        } else if (val > 60) {
            return ary[2]
        } else if (val >= 40) {
            return ary[3]
        } else if (val >= 25) {
            return ary[4]
        } else if (val >= 10) {
            return ary[5]
        } else if (val >= 0) {
            return ary[6]
        } else {
            return ""
        }
    }

    function get_value(value_name) {
        let query;
        if (window.location.search) {
            query = window.location.search.substring(1);
        } else {
            query = window.location.hash.substring(1);
        }
        return (new URLSearchParams(query)).get(value_name);
    }

    function set_bar_and_percent(left_name, right_name, value) {
        $("#bar-" + left_name).css({"width": value + "%"})
        $("#percent-" + left_name).html(value + "%")
        $("#percent-" + right_name).html((100 - value) + "%")
    }

    function initialize() {
        let equality = get_value("econ")
        let liberty = get_value("govt")
        let progress = get_value("scty")
        let ecology = get_value("envo")

        set_bar_and_percent("equality", "market", equality)
        set_bar_and_percent("liberty", "authority", liberty)
        set_bar_and_percent("progress", "tradition", progress)
        set_bar_and_percent("ecology", "production", ecology)

        let special_desc = ""
        specials.forEach((item) => {
            let value = get_value(item.id)
            if (!isNaN(value)) {
                if (value >= 66) {
                    // todo 特性的描述完成之后取消注释下一行即可
                    special_desc += "<strong>" + item.name + "</strong>：" + item.desc + "<br>"
                    $("#" + item.id + "-show").removeClass("hide")
                    if (value < 83) {
                        $("#" + item.id + "-show img").css({"opacity": "50%"})
                    }
                }
            }
        })
        $("#special-desc").html(special_desc)

        $("#label-econ").html(get_label(equality, econ_arr))
        $("#label-govt").html(get_label(liberty, govt_arr))
        $("#label-scty").html(get_label(progress, scty_arr))
        $("#label-envo").html(get_label(ecology, envo_arr))

        let min_dist = Infinity
        let min_index = 0
        for (let i = 0; i < ideologies.length; i++) {
            let dist = 0
            dist += Math.pow(Math.abs(ideologies[i].stats.econ - equality), 2)
            dist += Math.pow(Math.abs(ideologies[i].stats.govt - liberty), 2)
            dist += Math.pow(Math.abs(ideologies[i].stats.scty - progress), 1.73856063)
            if (dist < min_dist) {
                min_index = i
                min_dist = dist
            }
        }
        if (!isNaN(equality) && !isNaN(liberty) && !isNaN(progress)) {
            $("#ideology-label").html(ideologies[min_index].name)
            $("#ideology-label2").html(ideologies[min_index].name)
            $("#ideology-desc").html(ideologies[min_index].desc)
            $("#ideology-link").attr("href", ideologies[min_index].link).html(ideologies[min_index].link)
        }
    }

})

