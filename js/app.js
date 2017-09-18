var President = Backbone.Model.extend({
    defaults: {
        name: '', // defaults are overwritten with whatever passed on instantiation
        surname: '',
        rate: 0
    },
    validate: function (attributes) {
        if (attributes.name === '' || attributes.surname === '') {
            console.log('error');
            return 'Name cant be empty';
        }
    }
});

var PresidentsCollection = Backbone.Collection.extend({
    // with 'model' property set, raw data converted as a model of a proper type
    model: President
});

var presidentsCollection = new PresidentsCollection([{
    name: 'George',
    surname: 'Washington',
    rate: 5
}, {
    name: 'Barack',
    surname: 'Obama',
    rate: 9
}, {
    name: 'Bill',
    surname: 'Clinton',
    rate: 7
}, {
    name: 'Mill',
    surname: 'Clinton',
    rate: 35
}, {
    name: 'Gill',
    surname: 'Clinton',
    rate: 15
}, ]);

presidentsCollection.comparator = 'rate';
presidentsCollection.sort();

var MainView = Backbone.View.extend({
    tagName: 'tbody',
    render: function () {
        for (var i = 0; i < this.model.models.length; i++) {
            this.$el.append(new PresidentView({
                model: this.model.models[i]
            }).render().$el)
        }
        
        return this;
    }
});

var PresidentView = Backbone.View.extend({
    tagName: 'tr',
    my_template: _.template(`<td><%= this.model.collection.indexOf(this.model)+1 %></td> <td><%= name %></td> <td><%= surname %></td>  <td><%=rate %></td> <td><button class="remove">Remove</button></td>`),
    render: function () {
        this.$el.html(this.my_template(this.model.toJSON()));
        return this;
    },
    initialize: function (obj) {
        var that = this;
        obj.model.on('change', function () {
            that.render();
        })
       
    }
});

var InputsView = Backbone.View.extend({
    initialize: function () {
        var newObj = {};
        $('.mySubmit').on('click', function () {
            newObj = {
                name: $('.one')[0].value,
                surname: $('.two')[0].value,
                rate: $('.three')[0].value
            };
            presidentsCollection.push(new President(newObj));
            $('tbody').empty();
            mainView.render();
            remove.initialize();
        });
        
    }
});

var RemoveView = Backbone.View.extend({
    initialize: function () {
        $('.remove').on('click', function () {
            let target = $(event.target.parentNode.parentNode).index();
            presidentsCollection.remove( presidentsCollection.at(target))
            $('tbody').empty();
            mainView.render();
            remove.initialize();
        })
    }
});

var mainView = new MainView({ model: presidentsCollection });
$('table').append(mainView.render().$el);
var inputs = new InputsView(mainView);
var remove = new RemoveView(mainView);