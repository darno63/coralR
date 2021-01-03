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

        'search': function(vessel_name) {
            let ajax_options = {
                type: 'GET',
                url: `api/vessels/${vessel_name}`,
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_search_success', [data]);
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

    let $gmv = $('#gmv');

    // return the API
    return {

        // clears editor boxes
        reset: function() {
            $gmv.val('').focus();
        },

        // returns person to table
        build_table: function(vessel, gmv) {
            
            // clear the table 
            $('.vessels table > tbody').empty();

            // did we get a people array?
            if (vessel) {
                let row = `<tr data-vessel-id="${vessel.vessel_id}">
                        <td class="vessel_name">${vessel.vessel_name}</td>
                        <td class="region">${vessel.region}</td>
                        <td>${vessel.preptime}</td>
                        <td>${gmv}</td>
                       </tr>`;
                $('table > tbody').append(row);
            }
        },

        // returns available vessels
        build_dropdown: function(vessels) {
            let rows = ''

            // clear menu
            $('#vessel_name').empty();

            // build menu if we got a vessels array
            if (vessels) {
                for (let i=0, l=vessels.length; i < l; i++) {
                    rows += `<option value="${vessels[i].vessel_name}">
                            ${vessels[i].vessel_name}</option>`;
                }
                $('#vessel_name').append(rows);
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
        $vessel_name = $('#vessel_name'),
        $gmv = $('#gmv');

    // Get the data from the model after the controller is done initializing
    setTimeout(function() {
        model.read();
    }, 100)

    // Validate input
    function validate(vessel_name, gmv) {
        return vessel_name !== "" && gmv !== "";
    }

    // Create our event handlers
    $('#search').click(function(e) {
        let vessel_name = $vessel_name.val(),
            gmv = $gmv.val();

        e.preventDefault();

        if (validate(vessel_name, gmv)) {
            model.search(vessel_name)
        } else {
            alert('Problem with GMV input');
        }
    });

    $('#reset').click(function() {
        view.reset();
    })

    // Handle the model events
    $event_pump.on('model_read_success', function(e, data) {
        view.build_dropdown(data);
        view.reset();
    });

    $event_pump.on('model_search_success', function(e, data) {
        let gmv = $gmv.val();
        view.build_table(data, gmv);
    });

    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));
