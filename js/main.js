var checkTime;
var meri;

// Initialize function
var init = function() {
	// TODO:: Do your initialization job
	console.log('init() called');

	document.addEventListener('visibilitychange', function() {
		if (document.hidden) {
			// Something you want to do when hide or exit.
		} else {
			// Something you want to do when resume.
		}
	});

	// add eventListener for keydown
	document.addEventListener('keydown', function(e) {
		switch (e.keyCode) {
		case 37: // LEFT arrow
			break;
		case 38: // UP arrow
			break;
		case 39: // RIGHT arrow
			break;
		case 40: // DOWN arrow
			break;
		case 13: // OK button
			break;
		case 10009: // RETURN button
			tizen.application.getCurrentApplication().exit();
			break;
		default:
			console.log('Key code : ' + e.keyCode);
			break;
		}
	});
};
// window.onload can work without <body onload="">
window.onload = init;

function startTime(n) {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);

	if (n === 24) {
		document.getElementById('24h').innerHTML = 'Current time: ' + h + ':'
				+ m + ':' + s;
		setTimeout(startTime, 10);
	} else if (n === 12) {
		if ((h / 12 >= 1)) {
			meri = "PM"
		} else {
			meri = "AM"
		}

		h = h % 12;
		if (h === 0) {
			h = 12;
		}

		document.getElementById('12h').innerHTML = 'Current time: ' + h + ':'
				+ m + ':' + s + meri;
		setTimeout(startTime, 10);

	} else {
		console.log("Wrong entry")
	}
}

function checkTime(i) {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
}

$(document)
		.ready(
				function() {

					/* Inititate CAPH */
					$.caph.focus
							.activate(function(nearestFocusableFinderProvider,
									controllerProvider) {

								/* Events for the focused elements */

								controllerProvider.onFocused(function(event,
										originalEvent) {
									$(event.currentTarget).css({
										border : '3px solid blue'
									})
								})
								/* Event for the selected elements */

								controllerProvider
										.onSelected(function(event,
												originalEvent) {
											if ($(event.currentTarget).attr(
													"id") === "12hour") {
												startTime(12)
											}
											if ($(event.currentTarget).attr(
													"id") === "24hour") {
												startTime(24)
											}
										})

								/* Event for blurred elements */
								controllerProvider.onBlurred(function(event,
										originalEvent) {
									if ($(event.currentTarget).attr("class")
											.split(' ')[0] === "logoH") {
										$(event.currentTarget).css({
											border : '3px solid transparent'
										});
									} else {
										$(event.currentTarget).css({
											border : '0px solid transparent'
										});
									}
								})
							})
				})
