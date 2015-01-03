'use strict';

define([
    'text!modules/map/templates/map_item.html',
    ],
    function(map_item){
        App.MapModule.MapItemView  = Backbone.Marionette.ItemView.extend({
            tagName: 'div',
            initialize: function(){
                this.$el.prop('id', this.model.get('id'));
                this.$el.prop('class', this.model.get('class') + ' map_item_view');
            },
            events: {

            },
            attributes : function () {
                return {
                };
            },
            template: function() {
                return _.template(map_item)({
                })
            },
            onRender: function(){
                App.execute('debug', 'App.MapModule.MapItemView.onRender event called.', 0);
                var _options = this.model.get('options');
                console.log(_options);

                App.WindowModule.vent.trigger('WindowItemView.render', this);
            },

            
        });
    }
);