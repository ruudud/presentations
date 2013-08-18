var Router = Backbone.Router.extend({
    routes: {
        "movies/:contentId" : "movie",
        "*action"           : "index"
    },

    initialize: function () {
        // Set up with data from static json
        this.movies = new Movies();
        this.movies.reset(moviesJson, { parse: true });

        // Setup up views
        this.listView = new List({ collection: this.movies });
        this.movieView = new MovieView();
    },

    index: function () {
        this.listView.render();
    },

    movie: function (contentId) {
		this.movieView.setModel(this.movies.get(contentId));
    }
});

var router = new Router();

//Backbone.history.start({ pushState: true });
Backbone.history.start();
