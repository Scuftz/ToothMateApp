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
      index,
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
  "Third Molar (Top Right)",
  "Second Molar (Top Right)",
  "First Molar (Top Right)",
  "Second Bicuspid (Top Right)",
  "First Bicuspid (Top Right)",
  "Cuspid (Top Right)",
  "Lateral Incisor (Top Right)",
  "Central Incisor (Top Right)",
  "Central Incisor (Top Left)",
  "Lateral Incisor (Top Left)",
  "Cuspid (Top Left)",
  "First Bicuspid (Top Left)",
  "Second Bicuspid (Top Left)",
  "First Molar (Top Left)",
  "Second Molar (Top Left)",
  "Third Molar (Top Left)",
  "Third Molar (Bottom Left)",
  "Second Molar (Bottom Left)",
  "First Molar (Bottom Left)",
  "Second Bicuspid (Bottom Left)",
  "First Bicuspid (Bottom Left)",
  "Cuspid (Bottom Left)",
  "Lateral Incisor (Bottom Left)",
  "Central Incisor (Bottom Left)",
  "Central Incisor (Bottom Right)",
  "Lateral Incisor (Bottom Right)",
  "Cuspid (Bottom Right)",
  "First Bicuspid (Bottom Right)",
  "Second Bicuspid (Bottom Right)",
  "First Molar (Bottom Right)",
  "Second Molar (Bottom Right)",
  "Third Molar (Bottom Right)",
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
