function Change(label, url) {
  this.label = label;
  var s = url.split(url.indexOf("#") > 0 ? "#" : "?r=");
  this.ref = s[0];
  this.revision = s[1];
  this.commits = 1;
  this.pref = new RegExp("/[a-zA-Z-_]+/", "");
  
  this.asA = function() {
    return "<a href='" + this.ref + "#" + this.revision + "'>" + this.label + "</a>"
  };
  
  this.setMaxRevision = function(revision) {
    if (revision > this.revision)
      this.revision = revision;
    this.commits++;
  };
  
  this.samePrefix = function(prefix) {
    return getPrefix() == prefix;
  };
  
  this.getPrefix = function() {
    return this.label.match(this.pref)[0];
  };
  
};

function createReviewView() {
  var index = 0;
  var changes = [];
  var mapChanges = [];
  //select dev with id issueContent 
  //select div with id issue_actions_container in it
  //select tables in it
  //find rows with text 'Files Changed'
  //select next sibling tr (in terminology of jquery it is "next adjacent selector"
  //select td in it 
  //select a in it
  $("div#issueContent div#issue_actions_container table tr:contains('Files Changed') + tr td a").each(function() {
    var change = new Change($(this).text(), $(this).attr("href"));
    if (mapChanges[change.label]) {
      mapChanges[change.label].setMaxRevision(change.revision);
    } else {
      changes[index++] = change;
      mapChanges[change.label] = change;
    }
  });
  changes.sort(function(a, b) { 
    return (b.label < a.label) - (a.label < b.label); 
  });
  var res = "<div class='issuePanelContainer' id='issue_actions_container'><table cellpadding='2' cellspacing='0' border='0' width='100%'>";
  res += "<tbody><tr><td bgcolor='#f0f0f0'><b>Commits</b></td><td bgcolor='#f0f0f0'><b>Changed File</b></td></tr>";
  var prefix;
  var sep = false;
  for (var i = 0; i < index; i++) {
    sep = (prefix && (prefix != changes[i].getPrefix()));
    res = res + "<tr><td" + style(sep) + ">" + changes[i].commits + "</td><td" + style(sep) + ">" + changes[i].asA() + "</td></tr>";
    prefix = changes[i].getPrefix();
  }
  return res + "</tbody></table></div>";
};

function style(sep) {
  return sep ? " style='border-top: solid #BBB 1px;'" : "";
};

if ($("div#issueContent table tr td :contains('Subversion Commits') :not(b > a)").size() == 1) { //where the Subversion Commits is but not inside a tag
  $("div#issueContent table:contains('Subversion Commits')").after("<div id='review_button_div' style='width: 100%;'><button id='review_button'>View for review</button></div>");
  var view = createReviewView();
  var revView = false;
  $("#review_button").click(function() {
    var oldView = $("div#issueContent div#issue_actions_container").detach();
    $("div#review_button_div").after(view);
    $("#review_button").text(revView ? "View for review" : "Change sets view");
    view = oldView;
    revView = !revView;
  });
}
