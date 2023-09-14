export class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set department(arg) {
    this._department = arg;
  }

  get department() {
    return this._department;
  }
}
