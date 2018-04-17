// Global widget alert close function
$(document).on('click', '#alertsBack', function(event) {
    event.preventDefault();

    $(this).find('.alert').fadeOut("normal", function() {
        $(this).remove();
    });
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// Socials network sharing popup
;(function($){
    $.fn.customerPopup = function (e, intWidth, intHeight, blnResize) {

        // Prevent default anchor event
        e.preventDefault();

        // Set values for window
        intWidth = intWidth || '500';
        intHeight = intHeight || '400';
        strResize = (blnResize ? 'yes' : 'no');

        // Set title and open popup with focus on it
        var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
            strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
            objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
    };

    /* ================================================== */

    $(document).ready(function ($) {
        $('.btn-social').on("click", function(e) {
            $(this).customerPopup(e);
        });
    });

}(jQuery));

/*
|--------------------------------------------------------------------------
| Search offer on top block
|--------------------------------------------------------------------------
*/

$( "#searchOffer" ).autocomplete({
    source: function (request, response) {
        $.ajax({
            url: '/offers/list/search',
            dataType: 'json',
            data: request,
            success: function (data) {
                response(data.map(function (value) {
                    return {
                        'label': value.title,
                        'id': value.id,
                        'title': value.title
                    };
                }));
            }
        });
    },
    minLength: 1,
    select: function(event, ui) {
        location.href="/offers/" + ui.item.id;
    }
});

/*
|--------------------------------------------------------------------------
| Search offer on top block
|--------------------------------------------------------------------------
*/

$( "#searchOffer" ).autocomplete({
    source: function (request, response) {
        $.ajax({
            url: '/offers/list/search',
            dataType: 'json',
            data: request,
            success: function (data) {
                response(data.map(function (value) {
                    return {
                        'label': value.title,
                        'id': value.id,
                        'title': value.title
                    };
                }));
            }
        });
    },
    minLength: 1,
    select: function(event, ui) {
        location.href="/offers/" + ui.item.id;
    }
});

/*
|--------------------------------------------------------------------------
| Search offers of a company
|--------------------------------------------------------------------------
*/

$( "#searchOfferByCompany" ).autocomplete({
    source: function (request, response) {
        console.log(request);
        return;

        $.ajax({
            url: '/offers/company/',
            dataType: 'json',
            data: request,
            success: function (data) {
                response(data.map(function (value) {
                    return {
                        'label': value.title,
                        'id': value.id,
                        'title': value.title
                    };
                }));
            }
        });
    },
    minLength: 1,
    select: function(event, ui) {
        location.href="/offers/" + ui.item.id;
    }
});

/*
|--------------------------------------------------------------------------
| Filter offer checkboxes
|--------------------------------------------------------------------------
*/

$(document).on('change', '.checkboxInput', function(event) {
    if ($(this).val() == "all") {
        $('.checkboxInput:checked').filter(function() { return $(this).val() !== "all"; }).prop('checked', false);
    }

    if ($(this).val() !== "all") {
        $('.checkboxInput:checked').filter(function() { return $(this).val() == "all"; }).prop('checked', false);
    }

    $(this).closest('form').submit();
});

$(document).on('submit', 'form[name=filterOffer]', function(event) {
    event.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function(response) {
            $('.boxList').hide().html($(response).find('.boxList').html()).fadeIn();
        },
        error: function (response) {
            console.error(response);
            alertWidget("#alerts" ,"<strong>Une erreur est survenue.</strong> Merci de réessayer le filtre ultérieurement.", "alert-danger", 4000);
        },
    });
});