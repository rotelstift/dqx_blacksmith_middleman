var damageRange = damageCal(1000);

function renderChart(chartName, chartContainerID, itemDataAry) {
  var chartName = new CanvasJS.Chart(chartContainerID,
  {
    // title:{
    // 	text: "My First Chart in CanvasJS"
    // },
    axisY: {
      includeZero:true,
      title: "ダメージ値",
      interval: 30,
      viewportMaximum: itemDataAry[1] + 30,
      stripLines: [
        { //ねらい打ちしてもいい範囲
          startValue: fakeCritical(itemDataAry[1], damageRange[3][0]),
          endValue: overDamage(itemDataAry[1], damageRange[3][1]),
          label: fakeCritical(itemDataAry[1], damageRange[3][0]) + " 〜 " + overDamage(itemDataAry[1], damageRange[3][1]),
          labelBackgroundColor: "rgba(255, 255, 255, 0.3)",
          labelAlign: "center",
          opacity: .4,
          color: "red"
        },
        { //上下狙いで出る範囲
          startValue: fakeCritical(itemDataAry[1], damageRange[4][0]),
          endValue: overDamage(itemDataAry[1], damageRange[4][1]),
          label: fakeCritical(itemDataAry[1], damageRange[4][0]) + " 〜 " + overDamage(itemDataAry[1], damageRange[4][1]),
          labelBackgroundColor: "rgba(255, 255, 255, 0.3)",
          labelAlign: "center",
          opacity: .4, // x ? y : z
          //opacity: (itemDataAry[0] - damageRange[3][0] > itemDataAry[1] - damageRange[3][1]) ? .0 : .8
          color: "blue"
        },
        { //成功ゾーン
          startValue: itemDataAry[0],
          endValue: itemDataAry[1],
          opacity: .2,
          color: "green"
        }
    ],
    },
    axisX: {
      title: "ゲージ",
      interval: 10000,
    },
    data: [
      {
        type: "rangeBar",
        //showInLegend: true,
        yValueFormatString: "#0.##",
        //indexLabel: "{y[#index]}",
        dataPoints: [   // Y: [Low, High]
          {x: 0, y:itemDataAry, label: "成功ゾーン"},
          {x: 0, y:[0, 0], label: "ダメージ総量"},
          {x: 10, y: [damageRange[1][0],damageRange[1][1]], label: "手加減打ち"},
          {x: -10, y: [damageRange[2][0],damageRange[2][1]], label: "乱れ打ち"},
          {x: 10, y: [damageRange[3][0],damageRange[3][1]], label: "叩く、狙い打ち"},
          {x: -10, y: [damageRange[4][0],damageRange[4][1]], label: "上下打ち、4連打ち、ななめ打ち"},
          {x: 10, y: [damageRange[5][0],damageRange[5][1]], label: "2倍打ち、超4連打ち"},
          {x: -10, y: [damageRange[6][0],damageRange[6][1]], label: "熱風おろし"},
          {x: 10, y: [damageRange[7][0],damageRange[7][1]], label: "3倍打ち"}

        ]
      }
    ]
  });

  chartName.render();

  return chartName;

}

function refreshChart(chartName, damageID, itemDataAry){
  //var length = chart.options.data[0].dataPoints.length;
  var damage = parseInt($(damageID).val());
  //alert(damage);
  //alert("hoge");
  //alert(damageCal(1950));
  var temp = parseInt($("#temperature").val());
  damageRange = damageCal(temp);
  //alert(damageRange);

  chartName.options.data[0].dataPoints[1].y[1] = damage;
  for(var i = 2; i <= 8; i++){
    chartName.options.data[0].dataPoints[i].y = [damageRange[i - 1][0] + damage, damageRange[i - 1][1] + damage];
  }
  chartName.options.axisY.stripLines[0].startValue = fakeCritical(itemDataAry[1], damageRange[3][0]);
  chartName.options.axisY.stripLines[0].endValue = overDamage(itemDataAry[1], damageRange[3][1]);
  chartName.options.axisY.stripLines[0].label = fakeCritical(itemDataAry[1], damageRange[3][0]) + " 〜 " + overDamage(itemDataAry[1], damageRange[3][1]);
  chartName.options.axisY.stripLines[0].labelAlign = "center";

  chartName.options.axisY.stripLines[1].startValue = fakeCritical(itemDataAry[1], damageRange[4][0]);
  chartName.options.axisY.stripLines[1].endValue = overDamage(itemDataAry[1], damageRange[4][1]);
  chartName.options.axisY.stripLines[1].label = fakeCritical(itemDataAry[1], damageRange[4][0]) + " 〜 " + overDamage(itemDataAry[1], damageRange[4][1]);
  chartName.options.axisY.stripLines[1].labelAlign = "center";

  chartName.options.axisY.stripLines[1].opacity = .4;

  chartName.render();
}

function moveFocus(objAry, now, step){

  //alert(step);
  switch(step){
      case "+1":
      //alert(step);

      for(i = 0; i < objAry.length; i++){
        if (objAry[i].name == now) {
          if (i+1 >= objAry.length){
            $("#" + objAry[0].name).focus();
            break;
          } else {
            $("#" + objAry[i+1].name).focus(); //$("input")[i+1].focus(); っていけるかな？
            break;
          }
        }
      }
      break;

      case "-1":

      for(i = 0; i < objAry.length; i++){
        if (objAry[i].name == now) {
          if (i-1 < 0){
            $("#" + objAry[objAry.length - 1].name).focus();
            break;
          } else {
            $("#" + objAry[i-1].name).focus();
            break;
          }
        }
      }
      break;

      case "+2":

      for(i = 0; i < objAry.length; i++){
        if (objAry[i].name == now) {
          if (i+2 >= objAry.length){
            $("#" + objAry[i+2 - objAry.length].name).focus();
            break;
          } else {
            $("#" + objAry[i+2].name).focus();
            break;
          }
        }
      }
      break;

      case "-2":

      for(i = 0; i < objAry.length; i++){
        if (objAry[i].name == now) {
          if (i-2 < 0){
            $("#" + objAry[i-2 + objAry.length].name).focus();
            break;
          } else {
            $("#" + objAry[i-2].name).focus();
            break;
          }
        }
      }
      break;
    }
}

function overDamage(itemMax, damageMax){
  return itemMax - damageMax;
}

function fakeCritical(itemMax, damageMin){
  return itemMax - damageMin * 2;
}