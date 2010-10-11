function MarketPage() {
	this.markGoodPlayers = function(types, minimalQuality) {
		$("table#table-1 tbody tr").each(function() {
			var player = new Player();
			$(this).find("td").each(function(index) {
				var str = $(this).text();
				if ((index >= 5) && (index <= 11)) {
					var qualityStr = $(this).find("span").text();
					player.values[index - 5] = parseFloat(str.substring(0, str.length - qualityStr.length));
					player.qualities[index - 5] = parseFloat(qualityStr);
				} else if (index == 12) {
					player.experience = parseFloat(str);
				}
			});
			var mark = false;
			var qualities = ""
			for (var index = 0; index < types.length; index++) {
				qualities = qualities + player.valueAs(types[index]) + " " + player.qualityAs(types[index]) + "   ";
				if (player.qualityAs(types[index]) >= minimalQuality) mark = true;
			}
			$(this).find("td a").attr("title", qualities);
			if (mark) {
				$(this).find("td").attr("style", "background-color: #99FF66");
			}
		});
	};
};

var page = new MarketPage();
page.markGoodPlayers(types, minimalQuality);

