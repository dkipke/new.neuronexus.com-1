"use strict";
// Class definition
var KTDatatableProperty = function() {
    // Private functions
    var options = {
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: `${window.location.protocol}//${window.location.host}/property/getall`,
                },
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
        },

        // layout definition
        layout: {
            scroll: true, // enable/disable datatable scroll both horizontal and
            // vertical when needed.
            height: 500, // datatable's body's fixed height
            footer: false // display/hide footer
        },

        // column sorting
        sortable: true,

        pagination: true,

        // columns definition

        columns: [
        {   
            width:100,
            field: 'property_type',
            title: 'Property Type',
            template: '{{property_type}}',
        },
        {   
            width:100,
            field: 'open_house_price',
            title: 'Open House Price',
            template: '$'+' '+'{{open_house_price}}',
        },
        {   
            width:100,
            field: 'initial_investment',
            title: 'Initial Investment',
            template: '$'+' '+'{{initial_investment}}',
        },
        {   
            width:100,
            field: 'lot_size',
            title: 'Lot Size',
            template: '{{lot_size}}',
        },
        {   
            width:100,
            field: 'hoa',
            title: 'Hoa',
            template: '{{hoa}}',
        },

        {   
            width:100,
            field: 'status',
            title: 'Status',
            // callback function support for column rendering
            template: function(row) {

                var status = {
                    "Active": {
                        'title': 'Active',
                        'class': 'kt-badge--brand'
                    },
                    "Inactive": {
                        'title': 'Inactive',
                        'class': ' kt-badge--danger'
                    },
                };
                return '<span class="kt-badge ' + status[row.status].class +
                    ' kt-badge--inline kt-badge--pill KTStatusUpdate onHover curserpointer" data-id="'+row._id+'" >' + status[row.status].title +
                    '</span>';
            },
        }, {
            field: 'Actions',
            title: 'Actions',
            sortable: false,
            width: 110,
            overflow: 'visible',
            textAlign: 'left',
	        autoHide: false,
            template: function(row) {
                return '\
                    \<a href="'+window.location.protocol+'//'+window.location.host+'/property/edit/'+row._id+'" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
                        <i class="flaticon-edit"></i>\
                    </a>\
                    \<a id="del-'+ row._id + '" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm ktDelete" title="Delete">\
                    <i class="flaticon-delete"></i>\
                    </a>';
            },
        }],
    };

    // basic demo
    var propertySelector = function() {

        options.search = {
            input: $('#generalSearch'),
        };

        var datatable = $('#propertyRecordSelection').KTDatatable(options);

        $('#kt_form_status').on('change', function() {
            datatable.search($(this).val(), 'Status');
        });

        $('#kt_form_type').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

        datatable.on(
            'kt-datatable--on-check kt-datatable--on-uncheck kt-datatable--on-layout-updated',
            function(e) {
                var checkedNodes = datatable.rows('.kt-datatable__row--active').nodes();
                var count = checkedNodes.length;
                $('#kt_datatable_selected_number').html(count);
                if (count > 0) {
                    $('#kt_datatable_group_action_form').collapse('show');
                } else {
                    $('#kt_datatable_group_action_form').collapse('hide');
                }
        });

        $('#kt_modal_fetch_id').on('show.bs.modal', function(e) {
            var ids = datatable.rows('.kt-datatable__row--active').
            nodes().
            find('.kt-checkbox--single > [type="checkbox"]').
            map(function(i, chk) {
                return $(chk).val();
            });
            var c = document.createDocumentFragment();
            for (var i = 0; i < ids.length; i++) {
                var li = document.createElement('li');
                li.setAttribute('data-id', ids[i]);
                li.innerHTML = 'Selected record ID: ' + ids[i];
                c.appendChild(li);
            }
            $(e.target).find('.kt-datatable_selected_ids').append(c);
        }).on('hide.bs.modal', function(e) {
            $(e.target).find('.kt-datatable_selected_ids').empty();
        });

        $(document).on('click', '.KTStatusUpdate', function(){
            var elemID = $(this).data('id');
            swal.fire({
                title: 'Are you sure?',
                // text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, status change it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then(function(result){
                if (result.value) {
                    window.location.href = `${window.location.protocol}//${window.location.host}/property/status-change/${elemID}`;
                }
            });
        })
        
        $(document).on('click', '.ktDelete', function(){
            var elemID = $(this).attr('id').replace('del-', '');
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then(function(result){
                if (result.value) {
                    window.location.href = `${window.location.protocol}//${window.location.host}/property/delete/${elemID}`;
                }
            });
        });        
    };

    

    return {
        // public functions
        init: function() {
            propertySelector();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableProperty.init();
});