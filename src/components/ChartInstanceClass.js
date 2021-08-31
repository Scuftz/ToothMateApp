class ChartInstanceClass {
  constructor(id, top, right, name) {
    this.id = id;
    this.top = top;
    this.right = right;
    this.name = name;
    this.values = [];
    this.output = this.name + "\n";
  }
}

ChartInstanceClass.prototype.createList = function () {};

ChartInstanceClass.prototype.addValue = function (value) {
  this.values.push(value);
  this.output += value + " ";
};

export default ChartInstanceClass;
