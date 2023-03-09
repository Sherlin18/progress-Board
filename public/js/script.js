$(function() {

    var selectfields = {};

    $('#add-widget-form').on('submit', function(){
        // e.preventDefault();
        return confirm("Do you want to submit?");
    });

    $('.confirmation').on('submit', function(){
        return confirm("Do you want to delete?");
    });

    $('.edit').on('click', function(){
        var data = $(this).attr('data-widget');

        var widget = JSON.parse(data);

        for (var key in widget) {
            if (widget.hasOwnProperty(key)) {
                $('[name=' + key + ']').val(widget[key]);

                //update selectize
                if($('[name=' + key + ']').prop('tagName').toLowerCase() == 'select') {
                    selectfields[key][0].selectize.setValue(widget[key]);
                }
            }
        }
        $('#add-widget-form').fadeIn(200);
    });

    $('.add-widget').on('click', function(){
        $('#add-widget-form').fadeToggle(200);
        $('#add-widget-form')[0].reset();

        $('select').each(function(){
            var name = $(this).attr('name');
            selectfields[name][0].selectize.setValue('not-started');
        });
    });

    $('select').each(function(){
        var name = $(this).attr('name');
        selectfields[name] = $(this).selectize();
    });
});
