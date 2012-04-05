// JavaScript Document


/* generate containers for buttons and input tags */


$(document).ready(function()
{
	skinButtons();
	
});

function skinButtons()
{
	$('div.test-button[tabindex="0"]').wrap('<div class="button-container" />');
	$('div.test-button[tabindex="-1"]').wrap('<div class="button-container notab" />');
	$('div.test-button.selected[tabindex]').wrap('<div class="button-container selected notab" />');
	$('input.catch[type="text"]').wrap('<div class="catch-container" />');
	
}



var unfocusedTextfields = $('input.catch:not(.focus)')

$('input.catch:not(.focus)').focus(function()
{
	$('.catch-container')
		.removeClass('focus');
	$(this).parent()
		.addClass('focus');
	
});

$('div.test-button:parent(.button-container)').focus(function()
{
	$('.button-container')
		.removeClass('focus');
	$(this).parent()
		.addClass('focus');
});

/*
$('div.test-button.selected').each(function()
{
	$('.button-container.selected')
		.removeClass('selected');
	$(this).parent()
		.addClass('selected');

});

$('div.test-button').click(function()
{
	$(this).addClass('selected');
});
*/

$('div.test-button.selected:parent(.button-container)').focus(function()
{
	$('.button-container.selected')
		.removeClass('selected');
	$(this).parent()
		.addClass('selected');
	
});
	

