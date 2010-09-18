function PlayerPage() {
	this.parsePlayer = function(player) {
		$("table[cellspacing='4'] tr td[valign='top'] table.table_page").has("tr th:contains('Týmové informace')").find("tr:nth-child(4) td:nth-child(2)").each(function(index) {
				if (index == 0) player.combination = parseFloat($(this).text().split('%'));
		});
		$("table[cellspacing='4'] tr td[valign='top'] table.table_page").has("tr th:contains('Atributy')").find("tr:nth-child(3) td").each(function(index) {
			if (index < 7) {
				var tmp = $(this).text().split(' ');
				player.values[index] = parseFloat(tmp[0]);
				player.qualities[index] = parseFloat(tmp[1]);
			} else {
				player.experience = parseFloat($(this).text());
			}
		});
	};
	
	this.outputQualityAsType = function(player, type) {
		return "<tr><td>" + type.name + "</td><td>" + player.valueAs(type) + "<span class='space'> </span>" 
			+ "<span class='kva2'><font color='gray'>" + player.qualityAs(type) + "</font></td></tr>";
	};
	
	this.outputAvgQuality = function(player) {
		return "<tr><td>Průměrná kvalita</td><td>" + player.avgQuality() + "</td></tr>";
	};
	
	this.outputQualities = function(player, types) {
		var qualities = this.outputAvgQuality(player);
		for (var index = 0; index < types.length; index++) {
			qualities += this.outputQualityAsType(player, types[index]);
		}
		qualities = "<table class='table_page3' cellspacing='0' cellpadding='0'><tr><th colspan='2' align='center'>Kvalita hráče</th></tr>" + qualities + "</table>";
		$("table[cellspacing='4'] tr td[valign='top'] table.table_page3").after(qualities);
	};
};

var page = new PlayerPage();
var player = new Player();
page.parsePlayer(player);
page.outputQualities(player, types);


