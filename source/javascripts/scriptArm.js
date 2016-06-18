window.onload = function () {
	// チャートの初期化

	var chartA = renderChart("chartA", "chartContainerA", itemData[1]);
	var chartB = renderChart("chartB", "chartContainerB", itemData[2]);
	var chartC = renderChart("chartC", "chartContainerC", itemData[3]);


	$("form").on("keypress", function (e) {
    if (e.which === 13) {
			refreshChart(chartA, "#damageA", itemData[1]);
			refreshChart(chartB, "#damageB", itemData[2]);
			refreshChart(chartC, "#damageC", itemData[3]);
      return false;
    }
	});
	var damageRange = damageCal(1000);
	$(function() {
    $( "#slider" ).slider({
			min: 50,
			max: 2000,
			step: 50,
			value: 1000,
			slide: function(e, ui) {
	      $('#temperature').val(ui.value);
				refreshChart(chartA, "#damageA", itemData[1]);
				refreshChart(chartB, "#damageB", itemData[2]);
				refreshChart(chartC, "#damageC", itemData[3]);
	    },
			create: function(e, ui) {
	      $('#temperature').val($(this).slider('option', 'value'));
	    }
		});
  });

	$("#damageA").change(function(){
		refreshChart(chartA, "#damageA", itemData[1]);
	});
	$("#damageB").change(function(){
		refreshChart(chartB, "#damageB", itemData[2]);
	});
	$("#damageC").change(function(){
		refreshChart(chartC, "#damageC", itemData[3]);
	});





}
