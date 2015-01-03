'use strict';

define([
    'text!modules/map/templates/map_collection.html',
    ],
    function(map_collection){
    
        App.MapModule.MapView  = Backbone.Marionette.CompositeView.extend({
            template: function() {
                return _.template(map_collection)({
                })
            },
            attributes : function () {
                return {
                    'class': 'map_collection'
                };
            },
            childView: App.MapModule.MapItemView
        });


    
    }
);