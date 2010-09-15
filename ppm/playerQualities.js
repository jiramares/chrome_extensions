var wing = [[2, 3, 5, 6], [100.0, 80.0, 58.0, 53.0]];
var center = [[2, 3, 4, 5], [100.0, 65.0, 53.0, 53.0]];
var defender = [[1, 4, 5, 6], [100.0, 58.0, 58.0, 53.0]];
var goalkeeper = [[0, 4, 5], [100.0, 53.0, 53.0]];
var values = [];
var qualities = [];
var experience = 0.0;
var combination = 0.0;

function countQuality(type, qualities, size) {
	var index = 0;
	var quotient = 0;
	var denominator = 0;
	while (index < size) {
		quotient += type[1][index];
		denominator += type[1][index] / qualities[type[0][index]];
		index++;
	}
	return parseInt(quotient / denominator);
}

function countValue(type, values, size) {
	var index = 0;
	var value = 0;
	while (index < size) {
		value += type[1][index] * values[type[0][index]] / 100;
		index++;
	}
	return parseInt(value * (1 + 0.2 * experience / 100 + 0.2 * combination / 100));
}

$("table[cellspacing='4'] tr td[valign='top'] table.table_page").has("tr th:contains('Týmové informace')").find("tr:nth-child(4) td:nth-child(2)").each(function(index) {
	if (index == 0) combination = parseFloat($(this).text().split('%'));
});
$("table[cellspacing='4'] tr td[valign='top'] table.table_page").has("tr th:contains('Atributy')").find("tr:nth-child(3) td").each(function(index) {
	if (index < 7) {
		var tmp = $(this).text().split(' ');
		values[index] = parseFloat(tmp[0]);
		qualities[index] = parseFloat(tmp[1]);
	} else {
		experience = parseFloat($(this).text());
	}
});

var h = "<table class='table_page3' cellspacing='0' cellpadding='0'><tr><th colspan='2' align='center'>Kvalita hráče</th></tr>";
var g = "<tr><td>Brankář</td><td>" + countValue(goalkeeper, values, 3) + "<span class='space'> </span><span class='kva2'><font color='gray'>" + countQuality(goalkeeper, qualities, 3) + "</font></td></tr>";
var d = "<tr><td>Obránce</td><td>" + countValue(defender, values, 4) + "<span class='space'> </span><span class='kva2'><font color='gray'>" + countQuality(defender, qualities, 4) + "</font></td></tr>";
var w = "<tr><td>Křídelník</td><td>" + countValue(wing, values, 4) + "<span class='space'> </span><span class='kva2'><font color='gray'>" + countQuality(wing, qualities, 4) + "</font></td></tr>";
var c = "<tr><td>Centr</td><td>" + countValue(center, values, 4) + "<span class='space'> </span><span class='kva2'><font color='gray'>" + countQuality(center, qualities, 4) + "</font></td></tr>";
$("table[cellspacing='4'] tr td[valign='top'] table.table_page3").after(h + g + d + w + c + "</table>");
