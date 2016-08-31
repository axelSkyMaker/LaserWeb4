;(function(lw) {

    /**
    * LaserWeb com module.
    *
    * Description...
    */
    lw.add_module('layout.panes.com', {

        // Autoload the module ?
        autoload: true,

        // Module version
        version: '0.0.1',

        // Module title
        title: 'Communication',

        // Module icon
        icon: 'plug',

        // Extends
        extends: ['layout.pane'],

        // Has template (null, false, true or template path)
        has_template: true,

        // Pane model
        pane_model: {},

        // Module initialization
        // Called once when all modules are setup.
        init: function() {
            // Add the dock
            this.add_dock();

            // Add the pane
            this.add_pane();

            // Set dock active
            this.set_dock_active(true);

            // Get module pane template
            var pane_template = lw.get_template('layout-com-pane');

            // Add pane template to pane container
            this.$.pane.append(pane_template());

            // Get some initial data for the pane model...
            // !!! This kinds of data have to be obtained via an external resource (libs/class/api/etc...).
            // This is just for the test example.
            var available_interfaces = ['Serial', 'Network'];

            // Init pane model data
            this.pane_model.selected_interface   = ko.observable(available_interfaces[0]);
            this.pane_model.available_interfaces = ko.observableArray(available_interfaces);

            // Init some events callbacks
            var self = this;
            this.pane_model.select_interface = function(obj, evt) {
                // Called when the select input change
                // Publish a message to notify all modules
                self.pub('layout.com.interface.selected', obj.selected_interface());
            };

            // Bind pane model to the panel (DOM)
            ko.applyBindings(this.pane_model, this.$.pane[0]);

            // Later in your code you can add a new interface,
            // and the ui is updated automatically.
            this.pane_model.available_interfaces.push('My new interface');

            // And select the new interface
            var last_id = this.pane_model.available_interfaces().length - 1;
            this.pane_model.selected_interface(available_interfaces[last_id]);

            // Notify module init is done.
            this.pub('module.init.done');
        }

    });

})(laserweb);
