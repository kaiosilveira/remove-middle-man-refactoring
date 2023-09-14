export class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get manager() {
    return this._department.manager;
  }

  set department(arg) {
    this._department = arg;
  }
}
