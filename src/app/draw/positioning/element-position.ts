import { ElementRef } from "@angular/core";

const DELTA_RANGE = 10;

export class ElementPosition {
    public x1: number = 0;
    public x2: number = 0;
    public y1: number = 0;
    public y2: number = 0;

    constructor(element: ElementRef) {
        const rect = element.nativeElement.getBoundingClientRect();
        this.x1 = rect.left;
        this.x2 = rect.left + rect.width;
        this.y1 = rect.top;
        this.y2 = rect.top + rect.height;
    }

    public inRangeX(x: number) : boolean {
        return this.inRange(x, this.x1,this.x2);
    }

    public inRangeY(y: number) : boolean {
        return this.inRange(y,this.y1,this.y2);
    }

    public inRangeTop(y: number) : boolean {
        return this.inDelta(y,this.y1);
    }

    public inRangeBottom(y:number) :boolean {
        return this.inDelta(y,this.y2);
    }

    private inDelta(a: number, b:number) {
        return Math.abs(a-b) < DELTA_RANGE;
    }

    public isInRange(x: number, y:number) : boolean {
        return this.inRangeX(x) && this.inRangeY(y);
    }

    private inRange(pos: number, from: number, to: number) {
        return (pos > from) && (pos < to);
    }
}
