import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOptstyle]'
})
export class OptstyleDirective {
  @Input() isCorrect : boolean = false;

  constructor( private er : ElementRef, private render: Renderer2) { }

  @HostListener('click') answer(){
    if(this.isCorrect){
      this.render.setStyle(this.er.nativeElement, 'background-color', 'green');
      this.render.setStyle(this.er.nativeElement, 'color', 'white');
    }else{
      this.render.setStyle(this.er.nativeElement, 'background-color', 'red');
      this.render.setStyle(this.er.nativeElement, 'color', 'white');
    }
  }

 


}
