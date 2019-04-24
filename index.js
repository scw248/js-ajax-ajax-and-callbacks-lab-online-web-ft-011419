$("#search").on('click', searchRepositories);


function handlebarsSetup() {
  Handlebars.registerPartial('userDetails', $('#user-details-partial').html())
}

$(document).ready(function () {
  handlebarsSetup()
});

function showCommits(el) {
  var owner = el.dataset.owner;
  var repo = el.dataset.repository;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function (results) {
    var source = $("#commits-template").html();
    var template = Handlebars.compile(source);
    $('#details').html(template(results));
  }).fail(displayError());
}

function searchRepositories() {
  var input = $('#searchTerms').val();
  var src = $("#results-template").html()
  var template = Handlebars.compile(src)
  $.get(`https://api.github.com/search/repositories?q=${input}`, results =>
    $('#results').html(template(results))).fail(displayError())
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}