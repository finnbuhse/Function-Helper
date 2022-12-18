import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';

/* Use to horizontally and vertically centre html elements over a portion of the window. */
@Component({
  selector: 'centre',
  templateUrl: `./centre.component.html`,
  styles: [`h1 { font-family: Lato; }`]
})
export class CentreComponent implements AfterViewInit {
  static instanceCount = 0;

  @Input() width: string = "100vw";
  @Input() height: string = "100vh";
  @Input() marginOffset: string = "0px 0px 0px 0px";
  @Input() backgroundColour: string = "lightgrey";

  // Unique to each CentreComponent
  idNumber: Number;

  // The CentreComponent itself as HTMLElement
  native: HTMLElement;

  constructor(private elem: ElementRef) {
    this.idNumber = CentreComponent.instanceCount;
    this.native = this.elem.nativeElement as HTMLElement;
    CentreComponent.instanceCount++;
  }

  ngAfterViewInit() {
    // Set style inputs
    this.native.style.setProperty('--centreWidth', this.width);
    this.native.style.setProperty('--centreHeight', this.height);
    this.native.style.setProperty('--backgroundColour', this.backgroundColour);

    /* childDiv contains the centre's contents.
       The childDiv's id equals 'childDiv[idNumber]' e.g the id when the centre's idNumber = 0 would be 'childDiv0'. With this the centre's specific childDiv can be obtained.
       Use childDiv's width and height to calculate position so contents are centred. */
    var childDiv = document.getElementById("childDiv" + this.idNumber);
    if (childDiv != null)
    {
      var width = childDiv.offsetWidth + 1;
      var height = childDiv.offsetHeight + 1;

      /* Apply marginOffset input. */
      var marginOffsets = this.marginOffset.split(" ");
      var marginOffsetNumbers = [];

      for (var i = 0; i < marginOffsets.length; i++) {
        marginOffsetNumbers.push(parseFloat(marginOffsets[i].substring(0, marginOffsets.length - 3)));
      }
      var marginUnit = marginOffsets[0].substring(marginOffsets[0].length - 2, marginOffsets[0].length);

      var marginString = (marginOffsetNumbers[0] - height / 2) + marginUnit + " " + marginOffsetNumbers[1] + marginUnit + " " + marginOffsetNumbers[2] + marginUnit + " " + (marginOffsetNumbers[3] - width / 2) + marginUnit;
      this.native.style.setProperty('--margin', marginString);
    }
  }
}
