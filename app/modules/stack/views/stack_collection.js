'use strict';

define([
    'text!modules/stack/templates/stack_collection.html',
    ],
    function(stack_collection){
    
        tagName: 'article',
        App.StackModule.StackView  = Backbone.Marionette.CompositeView.extend({
            initialize: function(){

                this.$el.prop('id', this.options.stack_id);
                //this.$el.prop('class', this.model.get('class') + ' window_item_view');
            },
            template: function() {
                return _.template(stack_collection)({
                })
            },
            attributes : function () {
                return {
                    'class': 'stack_collection coverflow'
                };
            },
            childView: App.StackModule.StackItemView
        });


    
    }
);