function Player() {
	this.values = [];
	this.qualities = [];
	this.experience = 0.0;
	this.combination = 0.0;

	this.qualityAs = function(type) {
		var index = 0;
		var quotient = 0.0;
		var denominator = 0.0;
		while (index < 7) {
			quotient += type.prefs[index];
			denominator += type.prefs[index] / this.qualities[index];
			index++;	
		}
		return parseInt(quotient / denominator);
	};

	this.valueAs = function(type) {
		var index = 0;
		var value = 0.0;
		while (index < 7) {
			value += type.prefs[index] * this.values[index] / 100;
			index++;
		}
		return parseInt(value * (1 + 0.2 * this.experience / 100 + 0.2 * this.combination / 100));
	}
	
	this.avgQuality = function() {
		var index = 0;
		var avg = 0.0;
		while(index < this.qualities.length) {
			avg += this.qualities[index++];
		}
		return parseInt(avg / this.qualities.length);
	};
};

function PlayerType(name, prefs) {
	this.name = name;
	this.prefs = prefs;
};

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
		var index = 0;
		while (index < types.length) {
			qualities += this.outputQualityAsType(player, types[index++]);
		}
		qualities = "<table class='table_page3' cellspacing='0' cellpadding='0'><tr><th colspan='2' align='center'>Kvalita hráče</th></tr>" + qualities + "</table>";
		$("table[cellspacing='4'] tr td[valign='top'] table.table_page3").after(qualities);
	};
};

var types = [
	new PlayerType("Křídelník", [0.0, 0.0, 100.0, 80.0, 0.0, 58.0, 53.0] ),
	new PlayerType("Center", [0.0, 0.0, 100.0, 65.0, 53.0, 53.0, 0.0] ),
	new PlayerType("Obránce", [0.0, 100.0, 0.0, 0.0, 58.0, 58.0, 53.0] ),
	new PlayerType("Brankář", [100.0, 0.0, 0.0, 0.0, 53.0, 53.0, 0.0] )];

var page = new PlayerPage();
var player = new Player();
page.parsePlayer(player);
page.outputQualities(player, types);


