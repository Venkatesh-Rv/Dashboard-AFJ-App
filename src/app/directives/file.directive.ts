import { Directive } from '@angular/core';
import { ControlValueAccessor } from "@angular/forms";
import { ElementRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
const noop = () => {
	// ...
};
@Directive({
  selector: "input[type=file][ngModel][observeFiles]",
  host: {
		"(blur)": "onTouchedCallback()",
		"(change)": "handleChange( $event.target.files )"
  },
  providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: FileDirective,
      multi: true,
    }
			
	]
})
export class FileDirective {
	private elementRef: ElementRef;
	private onChangeCallback: Function;
	private onTouchedCallback: Function;
  constructor(elementRef: ElementRef) { 
    this.elementRef = elementRef;
 
	
		this.onChangeCallback = noop;
		this.onTouchedCallback = noop;


  }
  public handleChange( files: FileList ) : void {
 
		// If the input is set to allow MULTIPLE files, then always push an ARRAY of
		// files through to the calling context (even if it is empty).
		// --
		// NOTE: We are using Array.from() in order to create a proper Array from the
		// Array-like FileList collection.
		if ( this.elementRef.nativeElement.multiple ) {
 
			this.onChangeCallback( Array.from( files ) );
 
		// If the input is set to allow only a SINGLE file, then let's only push the
		// first file in the collection (or NULL if no file is available).
		} else {
 
			this.onChangeCallback( files.length ? files[ 0 ] : null );
 
		}
 
  }
  
  public registerOnChange( callback: Function ) : void {
 
		this.onChangeCallback = callback;
 
	}

  public registerOnTouched( callback: Function ) : void {
 
		this.onTouchedCallback = callback;
 
  }
  
  public setDisabledState( isDisabled: boolean ) : void {
 
		this.elementRef.nativeElement.disabled = isDisabled;
 
  }
  public writeValue( value: any ) : void {
 
		if ( value instanceof FileList ) {
 
			this.elementRef.nativeElement.files = value;
 
		} else if ( Array.isArray( value ) && ! value.length ) {
 
			this.elementRef.nativeElement.files = null;
 
		} else if ( value === null ) {
 
			this.elementRef.nativeElement.files = null;
 
		} else {
 
			// Since we cannot manually construct a FileList instance, we have to ignore
			// any attempt to push a non-FileList instance into the input.
			if ( console && console.warn && console.log ) {
 
				console.warn( "Ignoring attempt to assign non-FileList to input[type=file]." );
				console.log( "Value:", value );
 
			}
 
		}
 
	}
}
