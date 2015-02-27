MathML reader
=============

The purpose of this project is to unify the translation of equations into legible Braille via Nemeth coding and the same into audible Nemeth [MathSpeak](http://www.gh-mathspeak.com/examples/grammar-rules/), using MathML as the common source material.

This builds on work originally done by Charles L. Chen for [Fire Vox](http://firevox.clcworld.net/), an early Text-to-Speech plugin for Mozilla Firefox, and is released under the GPL V3.


Try it out
----------
Hop over to http://ryanhemphill.github.io/mathml-model/ with your favorite access assistant and tab through the listed examples.  Each tabbable div contains an equation in MathML with an aria-labelledby attribute referencing a hidden div with the translated output.  This way, the equations read off in their assistive styles when focused on.  For sighted users, MathJax is also invoked to render the MathML into HTML/CSS styled equations.


Make your own
-------------
Our demo pages contain the following code snippet, which demonstrates how the math-to-assistive-text process is started:

```javascript
function transMathToText(source, target)
{
	document.getElementById(target)
		.innerHTML=CLC_GetMathMLContent(document.getElementById(source).children[0]);
	
	$('#' + source).attr('aria-labelledby', target).attr('tabindex', '0');
}
```

This function will work as written as long as the source and target divs already exist, have id values, and the root of the MathML in the source is its first node child.  For other cases, the code shown above is adaptable; ensure that `CLC_GetMathMLContent` is passed in an element reference to the MathML root, and label the source by the target using `aria-labelledby` attributes.