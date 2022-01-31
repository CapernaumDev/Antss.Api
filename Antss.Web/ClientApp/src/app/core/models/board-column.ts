export class BoardColumn<T> {
    constructor(public title: string, public id: number, public data: T[]) {}
  }