export class Linereader {
  _lines: string[];
  _ctr: number;
  _max: number;

  constructor(lines: string[]) {
    this._ctr = 0;
    this._lines = lines;
    this._max = lines.length - 1;
  }

  public get eof() {
    return this._ctr === this._max;
  }

  public get nextLine() {
    return this._lines[this._ctr];
  }

  public read(): string;
  public read(lines: number): string[];
  public read(lines: number = 1): string | string[] {
    if (lines === 1) {
      const line = this._lines[this._ctr];
      this._ctr += 1;
      return line;
    }
    const out = this._lines.slice(this._ctr, this._ctr + lines);
    this._ctr += lines;
    return out;
  }

  readIf(str: string) {
    if (this.nextLine === str) {
      return this.read();
    }
  }

  readAll(): string | string[] {
    return this.read(this._max - this._ctr);
  }

  readUntilTrue(comparator: (line: string) => boolean): string | string[] | void {
    let lines = new Array<string>();
    const prevCtr = this._ctr;

    while (!this.eof) {
      let line = this.read();

      lines = [...lines, line];
      if (comparator(line)) return lines;
    }
    this._ctr = prevCtr;
  }

  readUntil(input: string): string | string[] | void {
    return this.readUntilTrue((w) => w === input);
  }
}
