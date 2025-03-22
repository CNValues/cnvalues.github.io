$.ajax({
    type: "GET",
    url: "info/version.json",
    dataType: "json",
    success: (data) => {
        $("#version").html("v " + data.version)
    }
})
