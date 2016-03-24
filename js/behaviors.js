$(function(){
	function positionModal(leftOnly){
		$(".modal, .statusModal").each(function(){
			var leftPlacement = ((($("body").width() / 2) - ($(this).width() / 2)) / 16) + "rem";

			$(this).css({
				left: leftPlacement
			});
		});

		if(leftOnly !== true){
			if($("body").hasClass("locked")){
				$(".modal, .statusModal").each(function(){
					var topPlacement = $(window).width() > 500 ? "10%" : 0;

					$(this).css({
						top: topPlacement
					});
				});
			}
		}
	}

	function openModal(){
		window.scroll(0, 0);
		var topPlacement = $(window).width() > 500 ? "10%" : 0;

		$(".modal").animate({
			"top": topPlacement
		}, 1000);
	}

	function closeModal(){
		// Clear All Fields
		clearFields();

		// Hide Modal
		$(".modal").hide(0, function(){
			$(".modal").removeAttr("style");
		});

		// Hide Page Fade
		$(".pageFade").hide();

		// Change body visibility
		$("body").removeClass("locked");
	}

	function clearFields(){
		$("#name, #address, #phone, #alternatePhone, #email, #problem, #preferredTime").val("");
	}

	$(function(){
		// Position the modal at page load
		positionModal();

		// Modal placement in response to window resize
		$(window).resize(positionModal);

		// Modal open
		$("#schedule").click(function(){
			// Turn on the page fader
			$(".pageFade").show();

			// Change body visibility
			$("body").addClass("locked");

			// Position modal
			positionModal(true);

			// Open Modal
			openModal();
		});

		// Modal close via click
		$(".closeModal, .pageFade").click(function(){
			// Close the modal
			closeModal();
		});

		// Modal close via pressing escape
		$(window).keyup(function(e){
			// Check if the modal is open and the escape key was pressed
			if(e.which === 27 && parseInt($(".modal").css("top"), 10) > 0){
				// Close the modal
				closeModal();
			}
		});

		// Appointment submit behavior
		$(".submitAppointment a").click(function(){
			$.ajax({
				url: "js/response.json",
				type: "GET",
				data: {
					name: $("#name").val(),
					address: $("#address").val(),
					phone: $("#phone").val(),
					alternatePhone: $("#alternatePhone").val(),
					email: $("#email").val(),
					problem: $("#problem").val(),
					preferredTime: $("#preferredTime").val()
				},
				dataType: "json",
				success: function(data, textStatus, xhr){
					// Populate the status
					$("#status").text(data.message);

					// Show the status
					$(".statusModal").css({
						"display": "flex"
					});

					closeModal();

					// Change the rel attribute of the status button
					if(data.status === true){
						$("#okayButton").attr("rel", "success");
						$("#headerStatus").text("Thank You!");
						clearFields();
					}
					else{
						$("#okayButton").attr("rel", "failure");
						$("#headerStatus").text("Error");
					}
				}
			});
		});

		$("#okayButton").click(function(){
			if($(this).attr("rel") === "failure"){
				// Fade out the modal
				$(".statusModal").css({
					"display": "none"
				});

				// Fade in the loader
				$(".modal").show();
			}
			else{
				// Fade out the status modal and page fade
				$(".statusModal, .pageFade").css({
					"display": "none"
				});
			}
		});
	});

	window.onorientationchange = positionModal;
});