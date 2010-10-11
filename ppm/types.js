function Player() {
	this.values = [];
	this.qualities = [];
	this.experience = 0.0;
	this.combination = 0.0;

	this.qualityAs = function(type) {
		var quotient = 0.0;
		var denominator = 0.0;
		for (var index = 0; index < 7; index++) {
			quotient += type.prefs[index];
			denominator += type.prefs[index] / this.qualities[index];
		}
		return parseInt(quotient / denominator);
	};

	this.valueAs = function(type) {
		var value = 0.0;
		for (var index = 0; index < 7; index++) {
			value += type.prefs[index] * this.values[index] / type.maxPref;
		}
		return parseInt(value * (1 + 0.2 * this.experience / 100 + 0.2 * this.combination / 100));
	}
	
	this.avgQuality = function() {
		var sum = 0.0;
		for (var index = 0; index < this.qualities.length; index++) {
			sum += this.qualities[index];
		}
		return parseInt(sum / this.qualities.length);
	};

	this.toString = function() {
		var str = ""
		for (var index = 0; index < 7; index++) {
			str = str + this.values[index] + "/" + this.qualities[index] + " ";
		}
		return str + this.experience + " " + this.combination;
	};
};

function PlayerType(name, prefs) {
	this.name = name;
	this.prefs = prefs;
	this.maxPref = 0.0;
	
	for (var index = 0; index < prefs.length; index++) {
		if (prefs[index] > this.maxPref)
			this.maxPref = prefs[index];
	};
};

var types = [
	new PlayerType("Křídelník", [0.0, 0.0, 100.0, 80.0, 0.0, 58.0, 53.0] ),
	new PlayerType("Center", [0.0, 0.0, 100.0, 65.0, 53.0, 53.0, 0.0] ),
	new PlayerType("Obránce", [0.0, 100.0, 0.0, 0.0, 58.0, 58.0, 53.0] ),
	new PlayerType("Brankář", [100.0, 0.0, 0.0, 0.0, 53.0, 53.0, 0.0] )];

var minimalQuality = 70;
