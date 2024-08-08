import { getRandomNumber } from "../utils";

type AllowedNodes = HTMLDivElement | HTMLSpanElement | HTMLParagraphElement;

interface LineShufflerLine {
    text: string;
    color: string;
}

interface LineShufflerProps {
    node: AllowedNodes;
    lines: LineShufflerLine[];
    speed?: number;
    pause?: number;
}

export class LineShuffler {
    private _node: AllowedNodes;
    private _lines: LineShufflerLine[];

    private _interval?: number = undefined;
    private _speed: number = 150;
    private _pause: number = 1000;


    constructor(props: LineShufflerProps) {
        this._node = props.node;
        this._lines = props.lines;

        if (props.speed && props.speed > 0) {
            this._speed = props.speed;
        }
        if (props.pause && props.pause >= 0) {
            this._pause = props.pause;
        }
    }

    public get lines(): LineShufflerLine[] {
        return this._lines;
    }

    public start(): void {
        if (this._interval !== undefined) {
            this.stop();
        }

        const startIndex = getRandomNumber(0, this._lines.length - 1);
        this._interval = setInterval(this.getUpdateFn(startIndex), this._speed);
    }

    public stop(): void {
        clearInterval(this._interval);
        this._interval = undefined;
    }

    private getUpdateFn(lineIndex = 0, letterIndex = 0, reverse = false): () => void {
        this.updateNode({ color: this._lines[lineIndex].color });

        return () => {
            letterIndex += reverse ? -1 : 1;

            const lineText = this._lines[lineIndex].text;
            const textToPrint = lineText.slice(lineText.length - letterIndex);

            this.updateNode({ text: textToPrint });

            if (letterIndex === lineText.length) {
                clearInterval(this._interval);
                setTimeout(() => {
                    this._interval = setInterval(this.getUpdateFn(lineIndex, letterIndex, true), this._speed);
                }, this._pause);
            } else if (letterIndex === -1 && reverse) {
                clearInterval(this._interval);
                if (lineIndex === this._lines.length - 1) {
                    this._interval = setInterval(this.getUpdateFn(0), this._speed);
                } else {
                    this._interval = setInterval(this.getUpdateFn(lineIndex + 1), this._speed);
                }
            }
        };
    }

    private updateNode(line: Partial<LineShufflerLine>) {
        if (line.text !== undefined) this._node.textContent = `_${line.text}`;
        if (line.color !== undefined) this._node.style.color = line.color;
    }
}