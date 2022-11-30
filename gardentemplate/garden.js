
function loadplants() {
    $.ajax({
        url: '/plantinfo',
        contentType: "application/json",
        success: function (response) {
            var list = $('#plant-list');
            list.html('');
            response.plantinfo.forEach(function (info) {
                list.append('\
						<li>' + info.plantName + '</li>'
                );
            });
        }
    })
};

function loadgarden() {
    $.ajax({
        url: '/usergardens',
        contentType: "application/json",
        success: function (response) {
            var list = $('#garden');
            list.html("");
            console.log(response.usergardens);
            response.usergardens.forEach(function (info) {
                list.append('\
						<div className="col-lg-2"><img className="img-thumbnail" height=150px width=150px src="' + info + '"></div>'
                );
            });
        }
    })
}

$(function() {
    loadplants();
    loadgarden();

    $('#addPlantBtn').on('click', function (event) {
        event.preventDefault();
        var updateInput = $('#add-plant');
        var inputString = updateInput.val();
        $.ajax({
            url: '/usergardens',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify({newPlant: inputString}),
            success: function (response) {
                loadgarden();
            }
        })
    });
});

	/*function garden{
		$.ajax({
			url: '/usergardens',
			contentType: "application/json",
			success: function(response) {
				var garden = $('#garden');
				garden.html('');
			}
		})
	});*/