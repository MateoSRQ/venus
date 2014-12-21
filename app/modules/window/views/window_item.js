'use strict';

define([
    'text!modules/window/templates/window_item.html',
    ],
    function(window_item){
        App.WindowModule.WindowItemView  = Backbone.Marionette.ItemView.extend({
            tagName: 'div',
            initialize: function(){
                this.$el.prop('id', this.model.get('id'));
                this.$el.prop('class', this.model.get('class'));
            },
            events: {

            },
            attributes : function () {
                return {
                };
            },
            template: function() {
                return _.template(window_item)({
                })
            },
            onRender: function(){
                App.execute('debug', 'App.WindowModule.onRender event called.', 0);
                var _options = this.model.get('options');
                console.log(_options);
                if (_options && _options.draggable && typeof(_options.draggable) !== undefined) {
                    this.$el.draggable(_options.draggable);
                }
                if (_options && _options.resizable && typeof(_options.resizable) !== undefined) {
                    _options.resizable.stop = function( event, ui ) {
                        App.WindowModule.vent.trigger('WindowItemView.resize.stop', {'event': event, 'ui': ui});
                    };

                    _options.resizable.resize = function( event, ui ) {
                        App.WindowModule.vent.trigger('WindowItemView.resize', {'event': event, 'ui': ui});
                    };
                    this.$el.resizable(_options.resizable);
                }
                App.WindowModule.vent.trigger('WindowItemView.render', this);
            }
        });
    }
);