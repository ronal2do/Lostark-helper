import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { EngravingEntry } from "../../../model/engraving-entry";
import { EngravingsService } from "../../../core/services/engravings.service";

@Component({
  selector: "lostark-helper-engraving-selector",
  templateUrl: "./engraving-selector.component.html",
  styleUrls: ["./engraving-selector.component.less"]
})
export class EngravingSelectorComponent implements OnChanges {

  @Input()
  negative: boolean | null = false;

  @Input()
  disabled: boolean | null = false;

  @Input()
  engraving!: EngravingEntry;

  @Output()
  engravingChange = new EventEmitter<EngravingEntry>();

  @Input()
  maxNodes!: number;

  @Input()
  minNodes = 0;

  public engravings$ = this.engravingsService.engravings$;

  public negativeEngravings$ = this.engravingsService.negativeEngravings$;

  @Input()
  public possibleNodesValues: number[] = [];

  constructor(private engravingsService: EngravingsService) {
  }

  public changeEngravingId(id: number | null): void {
    if (!id) {
      this.engraving.nodes = 0;
      this.engraving.engravingId = 0;
    }
    this.engravingChange.emit(this.engraving);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.possibleNodesValues.length === 0 || changes["maxNodes"] || changes["minNodes"]) {
      this.possibleNodesValues = new Array(1 + this.maxNodes - this.minNodes)
        .fill(null)
        .map((_, i) => i + this.minNodes);
    }
  }
}
