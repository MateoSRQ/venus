'use strict';

define([
    'text!modules/stack/templates/stack_collection.html',
    ],
    function(stack_collection){
    
        App.StackModule.StackView  = Backbone.Marionette.CompositeView.extend({
            template: function() {
                return _.template(stack_collection)({
                })
            },
            attributes : function () {
                return {
                    'class': 'stack_collection'
                };
            },
            childView: App.StackModule.StackItemView
        });


    
    }
);