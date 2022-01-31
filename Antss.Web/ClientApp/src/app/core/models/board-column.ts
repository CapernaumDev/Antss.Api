export class BoardColumn<T> {
    constructor(public name: string, public id: number, public data: T[]) {}
  }