/* Objective: Create the event capture concept used in the jQuery.hotkeys.js plugin and maintain the missing
 * element, the windows key.  In order to make this happen, an event listener on the document is going to 
 * need to be looking at whether the keyCode 91 is in a keyup or keydown state.  For windows, this is a crucial
 * difference, as the event captures the ctrl key as event.metaKey while the mac captures its apple key as 
 * event.metaKey - this will also require making sure that if the event.metaKey and the event.ctrlKey are both true,
 * that the event is ignored.  
 */

/*
 * First: 
 * 
 * We need to capture the windows key, which would be keyCode 91.  
 * This will be found in one of two means - event.which or event.keyCode
 * 
 * 
 */

$(document.body).bind('keydown', function(event)
{
	/* figure out whether the metaKey/Windows Key has been pressed */
	
});