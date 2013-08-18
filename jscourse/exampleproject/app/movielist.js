var Movie = Backbone.Model.extend({
    idAttribute: 'contentId'
});
var Movies = Backbone.Collection.extend({
    model: Movie,

    parse: function (data) {
        return data.contentList;
    }
});

var List = Backbone.View.extend({
    el: '#movieList',

    initialize: function () {
    },

    render: function () {
        var movieTemplate = _.template(this._movieTemplate);
        this.collection.each(function (movie) {
            var movieView = movieTemplate(movie.toJSON());
            this.$el.append(movieView);
        }.bind(this));
        return this;
    },

    _movieTemplate: [
        '<div class="listItem">',
        '  <h2 class="listItemTitle"><%= title %></h2>',
        '  <a href="#/movies/<%= contentId %>">',
        '    <img src="<%= coverUrl %>" />',
        '  </a>',
        '</div>'
    ].join('\n')
});

var MovieView = Backbone.View.extend({
    el: '#movie',
    _lastRenderedMovie: null,

    render: function () {
        if (this.model && this.model != this._lastRenderedMovie) {
            var template = _.template(this._template);

            this.$el.html(template(this.model.toJSON()));
        }
        return this;
    },

	setModel: function (model) {
		this.model = model;
		this.render();
	},

    _template: [
		'<div class="inset">',
        '<h1><%= title %></h1>',
        '<img src="<%= coverUrl %>" class="floatedLeft" />',
        '<p><%= shortDescription %></p>',
		'</div>'
    ].join('\n')
});
