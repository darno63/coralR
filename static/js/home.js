// Create the namespace instance
let ns = {};

// Create the model instance
ns.model = (function() {
    'use strict';

    let $event_pump = $('body');

    // Return the API
    return {
        'read': function() {
            let ajax_options = {
                type: 'GET',
                url: 'api/vessels',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_read_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },

        'search': function(vessel_id) {
            let ajax_options = {
                type: 'GET',
                url: `api/vessels/${vessel_id}`,
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_read_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
    };
}());

// Create the view instance
ns.view = (function() {
    'use strict';

    let $vessel_id = $('#vessel_id');
        //$fname = $('#fname');

    // return the API
    return {

        // clears editor boxes
        reset: function() {
            $vessel_id.val('').focus();
            $fname.val('');
        },

        // returns person to table
        build_table: function(vessel) {
            
            // clear the table 
            $('.vessels table > tbody').empty();

            // did we get a people array?
            if (vessel) {
                let row = `<tr data-vessel-id="${vessel.vessel_id}">
                        <td class="vessel_name">${vessel.vessel_name}</td>
                        <td class="region">${vessel.region}</td>
                        <td>${vessel.preptime}</td>
                       </tr>`;
                $('table > tbody').append(row);
            }
        },

        // returns error msg
        error: function(error_msg) {
            $('.error')
                .text(error_msg)
                .css('visibility', 'visible');
            setTimeout(function() {
                $('.error').css('visibility', 'hidden');
            }, 3000)
        }
    };
}());

// Create the controller
ns.controller = (function(m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $vessel_id = $('#vessel_id');

    // Get the data from the model after the controller is done initializing
    setTimeout(function() {
        model.read();
    }, 100)

    // Validate input
    function validate(vessel_id) {
        return vessel_id !== "";
    }

    // Create our event handlers
    $('#search').click(function(e) {
        let vessel_id = $vessel_id.val();

        e.preventDefault();

        if (validate(vessel_id)) {
            model.search(vessel_id)
        } else {
            alert('Problem with ID input');
        }
    });

    $('#reset').click(function() {
        view.reset();
    })

    // Handle the model events
    $event_pump.on('model_read_success', function(e, data) {
        view.build_table(data);
        view.reset();
    });

    $event_pump.on('model_create_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_update_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_delete_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));
