function init()
{
	var sampleArray = $('[ariaparent]');
	var focusable = $('[tabindex]:not([ariarole="widget-layer"],[ariarole="layer"])');
	var layerSampleArray = $(sampleArray).filter('[ariarole="layer"]');
	var widgetLayerSampleArray = $(sampleArray).filter('[ariarole="widget-layer"][tabindex]');
	var focusableElementsArray = $(sampleArray).filter('[tabindex]:not([ariarole="layer"], [ariarole="widget-layer"])');
	
	$('[ariaparent]').filter('[aria-selected="true"]').addClass('ariaselectedtrue');
	$('[ariaparent]').focus(function()
	{
		$(this).addClass('currentfocus');

	});
	// assignLayerBindings(sampleArray);
	// assignWidgetLayerBindings(sampleArray);
	// assignFocusableWidgetBindings(sampleArray);
	focusableElementBindTest(sampleArray, focusable);
	widgetLayerBindTest(sampleArray, widgetLayerSampleArray);
	layerBindTest(sampleArray, layerSampleArray);
	
}

var keyEventActive = false;
$(document.body).bind("keydown", function() { keyEventActive = true; });
$(document.body).bind("keyup", function() { keyEventActive = false; });

function focusableElementBindTest(_sampleArray, _focusableElementSampleArray)
{
	$(_focusableElementSampleArray).each( function(index)
	{
		var self = $(this);
		var selfIndex = index;
		var selfParentWidgetLayerId = $(self).attr('ariaparent');
		var selfParentWidgetLayer = $(_sampleArray).filter('[id=\"' + selfParentWidgetLayerId + '\"]');
		var prevElementIndex = selfIndex -1;
		var previousElement = $(_focusableElementSampleArray[prevElementIndex]);
		var nextElementIndex = selfIndex +1;
		var nextElement = $(_focusableElementSampleArray[nextElementIndex]);
		
		$(self).bind('keydown', 'left', function(event)
		{
			
			event.preventDefault(); /* NOTE: necessary to insure that keydown event isn't given to element receiving focus */

			if($(previousElement).length > 0)
			{
				$(self).attr('aria-selected', 'false');
				$(self).attr('tabindex', '-1');
				$(self).removeClass('ariaselectedtrue currentfocus');
				$(previousElement).attr('aria-selected', 'true');
				$(previousElement).attr('tabindex', '0');
				$(previousElement).addClass('ariaselectedtrue currentfocus');
				$(previousElement).focus();
			}
			
		});
		
		$(self).bind('keydown', 'right', function(event)
		{
			
			event.preventDefault(); /* NOTE: necessary to insure that keydown event isn't given to element receiving focus */
			
			if($(nextElement).length > 0)
			{
				$(self).attr('aria-selected', 'false');
				$(self).attr('tabindex', '-1');
				$(self).removeClass('ariaselectedtrue currentfocus');
				$(nextElement).attr('aria-selected', 'true');
				$(nextElement).attr('tabindex', '0');
				$(nextElement).addClass('ariaselectedtrue currentfocus');
				$(nextElement).focus();
			}
			
		});
		
		$(self).bind('keydown', 'cmd+shift+shift', function(event)
		{	dropToWidgetLayer(event);	});
		
		
		$(self).bind('keydown', 'cmd+shift+cmd', function(event)
		{	dropToWidgetLayer(event);	});
		
		
		
		function dropToWidgetLayer(event)
		{
			event.preventDefault(); /* NOTE: necessary to insure that keydown event isn't given to element receiving focus */
			
			if($(selfParentWidgetLayer).length > 0)
			{
				$(self).attr('tabindex', '-1');
				$(self).removeClass('currentfocus');
				$(selfParentWidgetLayer).attr('aria-selected', 'true');
				$(selfParentWidgetLayer).addClass('ariaselectedtrue currentfocus');
				$(selfParentWidgetLayer).focus();
			}
		}
		
		
	});
}


function widgetLayerBindTest(_sampleArray, _widgetLayerSampleArray)
{
	$(_widgetLayerSampleArray).each( function(index)
	{
		var self = $(this);
		var selfIndex = index;
		var selfId = $(this).attr('id');
		var selfParentLayerId = $(self).attr('ariaparent');
		var selfParentLayer = $(_sampleArray).filter('[id=\"' + selfParentLayerId + '\"]');
		var selfChildFocusableElements = $(_sampleArray).filter('[ariaparent=\"' + selfId + '\"][tabindex]');
		var prevWidgetLayerIndex = selfIndex -1;
		var previousWidgetLayer = $(_widgetLayerSampleArray[prevWidgetLayerIndex]);
		var nextWidgetLayerIndex = selfIndex +1;
		var nextWidgetLayer = $(_widgetLayerSampleArray[nextWidgetLayerIndex]);
		
		
		
		$(self).bind('keydown', 'cmd+shift+left', function(event)
		{
			
			event.preventDefault(); /* NOTE: necessary to insure that keydown event isn't given to element receiving focus */

			if($(previousWidgetLayer).length > 0)
			{
				$(self).attr('aria-selected', 'false');
				$(self).removeClass('ariaselectedtrue currentfocus');
				$(previousWidgetLayer).attr('aria-selected', 'true');
				$(previousWidgetLayer).addClass('ariaselectedtrue currentfocus');
				$(previousWidgetLayer).focus();	
			}
			
		});
		
		$(self).bind('keydown', 'cmd+shift+right', function(event)
		{
			
			event.preventDefault(); /* NOTE: necessary to insure that keydown event isn't given to element receiving focus */
			
			if($(nextWidgetLayer).length > 0)
			{
				$(self).attr('aria-selected', 'false');
				$(self).removeClass('ariaselectedtrue currentfocus');
				$(nextWidgetLayer).attr('aria-selected', 'true');
				$(nextWidgetLayer).addClass('ariaselectedtrue currentfocus');
				$(nextWidgetLayer).focus();
			}
			
		});
		
		$(self).bind('keydown', 'cmd+shift+down', function(event)
		{
			
			event.preventDefault(); /* NOTE: necessary to insure that keydown event isn't given to element receiving focus */
			
			if($(selfParentLayer).length > 0)
			{
				$(self).removeClass('currentfocus');
				$(selfParentLayer).attr('aria-selected', 'true');
				$(selfParentLayer).addClass('ariaselectedtrue currentfocus');
				$(selfParentLayer).focus();
			}
			
		});
		
		$(self).bind('keyup', 'cmd+shift', function(event)
		{	returnToSelectedElement(event);	});
		
		$(self).bind('keyup', 'shift+cmd', function(event)
		{	returnToSelectedElement(event);	});
		
		function returnToSelectedElement(event)
		{
			// alert("keyup shift+cmd activated!");
			event.preventDefault(); /* NOTE: necessary to insure that keydown event isn't given to element receiving focus */
			
			var ariaSelectedTarget = $(selfChildFocusableElements).filter('[aria-selected="true"]');
			if($(ariaSelectedTarget).length > 0)
			{
				$(self).removeClass('currentfocus');
				/* set all aria-selected="true" to "false" as a tree-clean */
				$(ariaSelectedTarget).each(function(index)
				{
					$(ariaSelectedTarget[index]).attr('aria-selected', 'false');
					$(ariaSelectedTarget[index]).removeClass('ariaselectedtrue currentfocus');
				
				});
				$(ariaSelectedTarget[0]).attr('aria-selected', 'true');
				$(ariaSelectedTarget[0]).addClass('ariaselectedtrue currentfocus');
				$(ariaSelectedTarget[0]).focus();
			}
			else
			{
				$(selfChildFocusableElements[0]).attr('aria-selected', 'true');
				$(selfChildFocusableElements[0]).addClass('ariaselectedtrue currentfocus');
				$(selfChildFocusableElements[0]).attr('tabindex', '0');
				$(selfChildFocusableElements[0]).focus();
			}
			
		}
		
		
		
		
		
//		$(self).bind('keydown', 'cmd+alt+alt', function()
//		{
//			// this function kills all bindings for focusable widget-layers
//			
//			$(_widgetLayerSampleArray).unbind('keydown', 'cmd+shift+right');
//			$(_widgetLayerSampleArray).unbind('keydown', 'cmd+shift+left');
//			$(_widgetLayerSampleArray).unbind('keydown', 'cmd+alt+alt');
//			
//			alert("Bindings Killed.");
//			
//		});
		
		
	});
	
	
}

function layerBindTest(_sampleArray, _layerSampleArray)
{
	$(_layerSampleArray).each( function(index)
	{
		
		var self = $(this);
		var selfIndex = index;
		var selfId = $(this).attr('id');
		var selfChildWidgetLayers = $(_sampleArray).filter('[ariaparent=\"' + selfId + '\"][tabindex][ariarole="widget-layer"]');
		var prevLayerIndex = selfIndex -1;
		var previousLayer = $(_layerSampleArray[prevLayerIndex]);
		var nextLayerIndex = selfIndex +1;
		var nextLayer = $(_layerSampleArray[nextLayerIndex]);
		
		
		$(self).bind('keydown', 'cmd+shift+left', function(event)
		{
			
			event.preventDefault(); /* NOTE: necessary to insure that keydown event isn't given to element receiving focus */

			if($(previousLayer).length > 0)
			{
				$(self).attr('aria-selected', 'false');
				$(self).removeClass('ariaselectedtrue currentfocus');
				$(previousLayer).attr('aria-selected', 'true');
				$(nextLayer).addClass('ariaselectedtrue currentfocus');
				$(previousLayer).focus();	
			}
			
		});
		
		$(self).bind('keydown', 'cmd+shift+right', function(event)
		{
			
			event.preventDefault(); /* NOTE: necessary to insure that keydown event isn't given to element receiving focus */
			
			if($(nextLayer).length > 0)
			{
				$(self).attr('aria-selected', 'false');
				$(self).removeClass('ariaselectedtrue currentfocus');
				$(nextLayer).attr('aria-selected', 'true');
				$(nextLayer).addClass('ariaselectedtrue currentfocus');
				$(nextLayer).focus();
			}
			
		});
		
		$(self).bind('keyup', 'cmd+shift', function(event)
		{	returnToSelectedWidgetLayer(event);	});
		
		$(self).bind('keyup', 'shift+cmd', function(event)
		{	returnToSelectedWidgetLayer(event);	});
		
		function returnToSelectedWidgetLayer(event)
		{
			// alert("keyup shift+cmd activated!");
			// event.preventDefault(); /* NOTE: removed to allow the key event to pass to the newly focused element */
			
			var ariaSelectedTarget = $(selfChildWidgetLayers).filter('[aria-selected="true"]');
			if($(ariaSelectedTarget).length > 0)
			{
				$(self).removeClass('currentfocus');
				$(self).addClass('ariaselectedtrue');
				/* set all aria-selected="true" to "false" as a tree-clean */
				$(ariaSelectedTarget).each(function(index)
				{
					$(ariaSelectedTarget[index]).attr('aria-selected', 'false');
					$(ariaSelectedTarget[index]).removeClass('ariaselectedtrue currentfocus');
				
				});
				$(ariaSelectedTarget[0]).attr('aria-selected', 'true');
				$(ariaSelectedTarget[0]).addClass('ariaselectedtrue currentfocus');
				$(ariaSelectedTarget[0]).focus();
			}
			else
			{
				$(selfChildWidgetLayers[0]).attr('aria-selected', 'true');
				$(selfChildWidgetLayers[0]).addClass('ariaselectedtrue currentfocus');
				// $(selfChildWidgetLayers[0]).attr('tabindex', '0');  /* NOTE: Do not change tabindex to 0, you don't want widget-layers to be focusable via tabbing	 */
				$(selfChildWidgetLayers[0]).focus();
			}
			
		}
		
		
		
	});
	
	
}

function assignLayerBindings(sampleArray)
{

	
	$('[ariarole]').live("focusin", function()
	{
		
			focusActiveState = true;
			var self = $(this);
			bindEventToElement(self);
			console.log(this.id, "focused in");
		
	});
	
	$('[ariarole]').live("focusout", function()
	{
		
			focusActiveState = false;
			var self = $(this);
			unbindEventsFromElement(self);
			console.log(this.id, "focused out");
		
	});

}

function unbindEventsFromElement(self) {
	$(self).unbind('keydown', 'cmd+shift+down');
}

function bindEventToElement(self)
{
	$(self).addClass('keypressCMD');
	console.log(self, " called bindEvent");
	
	function keyEvent() /* This is because the shift key is a modifier and a special key at the same time. */
	{
		$(this).removeClass('keypressCMD');
		console.log(this.id, " called keydown");
		$(this).next().focus();  
	//$(self).unbind('keydown', 'cmd+shift+down', arguments.callee); /* This is because the shift key is a modifier and a special key at the same time. */
	}
	
	console.log("key event active is ", keyEventActive);
	if(keyEventActive) {
		$(self).bind("keyup", 'cmd+shift+down', function() {
			$(this).unbind('keyup', 'cmd+shift+down');
			$(this).bind('keydown', 'cmd+shift+down', keyEvent);
		});
	} else {
		$(self).bind('keydown', 'cmd+shift+down', keyEvent);
	}
}

function assignWidgetLayerBindings(sampleArray)
{
	
}

function assignFocusableWidgetBindings()
{
	
}

init();
