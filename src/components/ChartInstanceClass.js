class ChartInstanceClass {
  constructor(top, right, name) {
    this.top = top;
    this.right = right;
    this.name = name;
    this.values = [];
  }
}

ChartInstanceClass.prototype.createList = function () {};

ChartInstanceClass.prototype.addValue = function (value) {
  this.values.push(value);
};

export default ChartInstanceClass;
