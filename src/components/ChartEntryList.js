import ChartInstanceClass from "./ChartInstanceClass";

class ChartEntryList {
  constructor() {
    this.allEntries = [];
  }
}

ChartEntryList.prototype.addChartInstance = function (value) {
  this.allEntries.push(value);
};

ChartEntryList.prototype.updateValue = function (index, value) {
  this.allEntries[index].addValue(value);
};

ChartEntryList.prototype.initList = function () {
  for (var index = 0; index < 32; index++) {
    let x = new ChartInstanceClass(
      topPositionArr[index],
      rightPositionArr[index],
      nameArr[index]
    );
    this.addChartInstance(x);
  }
};

ChartEntryList.prototype.viewList = function () {
  console.log(this.allEntries);
};

const nameArr = [
  "Third Molar (Right)",
  "Second Molar (Right)",
  "First Molar (Right)",
  "Second Bicuspid (Right)",
  "First Bicuspid (Right)",
  "Cuspid (Right)",
  "Lateral Incisor (Right)",
  "Central Incisor (Right)",
  "Central Incisor (Left)",
  "Lateral Incisor (Left)",
  "Cuspid (Left)",
  "First Bicuspid (Left)",
  "Second Bicuspid (Left)",
  "First Molar (Left)",
  "Second Molar (Left)",
  "Third Molar (Left)",
  "Third Molar (Left)",
  "Second Molar (Left)",
  "First Molar (Left)",
  "Second Bicuspid (Left)",
  "First Bicuspid (Left)",
  "Cuspid (Left)",
  "Lateral Incisor (Left)",
  "Central Incisor (Left)",
  "Central Incisor (Right)",
  "Lateral Incisor (Right)",
  "Cuspid (Right)",
  "First Bicuspid (Right)",
  "Second Bicuspid (Right)",
  "First Molar (Right)",
  "Second Molar (Right)",
  "Third Molar (Right)",
];

const rightPositionArr = [
  "70%",
  "70%",
  "69%",
  "67%",
  "65%",
  "60%",
  "53%",
  "45.25%",
  "37%",
  "29%",
  "22.5%",
  "16.5%",
  "15%",
  "13%",
  "11%",
  "11.5%",
  "11%",
  "11%",
  "13%",
  "16%",
  "20.5%",
  "25.5%",
  "31.5%",
  "37.5%",
  "44%",
  "50.5%",
  "56%",
  "61.5%",
  "66%",
  "68.5%",
  "71%",
  "71%",
];

const topPositionArr = [
  "42%",
  "37.5%",
  "33.5%",
  "30%",
  "24.5%",
  "21%",
  "18.5%",
  "17%",
  "17%",
  "18%",
  "21%",
  "24.75%",
  "30%",
  "33.5%",
  "37%",
  "41%",
  "50.5%",
  "55.5%",
  "61%",
  "66%",
  "70%",
  "72%",
  "73%",
  "73.5%",
  "73.5%",
  "73.5%",
  "73%",
  "71%",
  "66%",
  "60.5%",
  "55.5%",
  "50.5%",
];

export default ChartEntryList;
