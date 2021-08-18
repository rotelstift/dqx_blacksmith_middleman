window.onload = function () {
	// チャートの初期化
	var chartA = renderChart("chartA", "chartContainerA", itemData[1]);
	var chartB = renderChart("chartB", "chartContainerB", itemData[2]);
	var chartC = renderChart("chartC", "chartContainerC", itemData[3]);
	var chartD = renderChart("chartD", "chartContainerD", itemData[4]);

	// ダメージフォームにフォーカスが当たったら中身を全選択する
	$(".formContainer > form > input").focus(function(){
	  $(this).select();
	});

	// shiftKey + 矢印キーを押したらダメージフォームのフォーカスを移動する
	var inputAry = $(".formContainer > form > input").serializeArray();

	$('html').keydown(function(e){
		if(event.shiftKey){
			switch(e.which){
					case 39: // Key[→]

						moveFocus(inputAry, document.activeElement.id, "+1");

					break;

					case 37: // Key[←]
						moveFocus(inputAry, document.activeElement.id, "-1");
					break;

					case 38: // Key[↑]
						moveFocus(inputAry, document.activeElement.id, "-2");
					break;

					case 40: // Key[↓]
						moveFocus(inputAry, document.activeElement.id, "+2");
					break;

					default:
					break;
			}
		}
	});

	// リターンキーを押した時の挙動
	$("form").on("keypress", function (e) {
		if (e.which === 13) {
			// 温度を50度下げる
			$('#temperature').val($('#temperature').val() - 50);
			$("#slider").slider("value", $('#temperature').val());
			// チャートをリフレッシュする
			refreshChart(chartA, "#damageA", itemData[1]);
			refreshChart(chartB, "#damageB", itemData[2]);
			refreshChart(chartC, "#damageC", itemData[3]);
			refreshChart(chartD, "#damageD", itemData[4]);
			return false;
		}
	});

	// スライダーの挙動
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
				refreshChart(chartD, "#damageD", itemData[4]);
	    },
			change: function(e, ui) {
				$('#temperature').val(ui.value);
				refreshChart(chartA, "#damageA", itemData[1]);
				refreshChart(chartB, "#damageB", itemData[2]);
				refreshChart(chartC, "#damageC", itemData[3]);
				refreshChart(chartD, "#damageD", itemData[4]);
			},
			create: function(e, ui) {
	      $('#temperature').val($(this).slider('option', 'value'));
	    }
		});
  });

	// フォームの値が変化した時の挙動
	$("#damageA").change(function(){
		refreshChart(chartA, "#damageA", itemData[1]);
	});
	$("#damageB").change(function(){
		refreshChart(chartB, "#damageB", itemData[2]);
	});
	$("#damageC").change(function(){
		refreshChart(chartC, "#damageC", itemData[3]);
	});
	$("#damageD").change(function(){
		refreshChart(chartD, "#damageD", itemData[4]);
	});

}
