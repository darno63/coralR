/*
 * https://realpython.com/flask-connexion-rest-api/#javascript-file
 * JavaScript file for the application to demonstrate
 * using the API
 */

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
                url: 'api/people',
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

        'search': function(person_id) {
            let ajax_options = {
                type: 'GET',
                url: `api/people/${person_id}`,
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

    let $person_id = $('#person_id'),
        $fname = $('#fname'),
        $lname = $('#lname');

    // return the API
    return {

        // clears editor boxes
        reset: function() {
            $person_id.val('').focus();
            $lname.val('');
            $fname.val('');
        },

        // returns person to table
        build_table: function(person) {
            
            // clear the table 
            $('.people table > tbody').empty();

            // did we get a people array?
            if (person) {
                let row = `<tr data-person-id="${person.person_id}">
                        <td class="fname">${person.fname}</td>
                        <td class="lname">${person.lname}</td>
                        <td>${person.timestamp}</td>
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
        $person_id = $('#person_id'),
        $fname = $('#fname'),
        $lname = $('#lname');

    // Get the data from the model after the controller is done initializing
    setTimeout(function() {
        model.read();
    }, 100)

    // Validate input
    function validate(person_id) {
        return person_id !== "";
    }

    // Create our event handlers
    $('#search').click(function(e) {
        let person_id = $person_id.val();

        e.preventDefault();

        if (validate(person_id)) {
            model.search(person_id)
        } else {
            alert('Problem with ID input');
        }
    });

    $('#reset').click(function() {
        view.reset();
    })

    $('table > tbody').on('dblclick', 'tr', function(e) {
        let $target = $(e.target),
            person_id,
            fname,
            lname;

        person_id = $target
            .parent()
            .attr('data-person-id');

        fname = $target
            .parent()
            .find('td.fname')
            .text();

        lname = $target
            .parent()
            .find('td.lname')
            .text();

        view.update_editor({
            person_id: person_id,
            fname: fname,
            lname: lname,
        });
    });

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
