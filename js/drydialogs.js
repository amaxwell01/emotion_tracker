var dialog = {
    closeDialog : function( name ) {
        if( event.target.parentElement ) {
            var fileID = event.target.parentElement.parentElement.dataset.fileid;
        }
        
        if( !name ) {
            name = '';
        }
        
        $('#' + name + 'DialogWrapper').remove();
        $('#' + name + 'CustomDialog').remove();
    },
    
    // this is the standard dialog that will be used everywhere in the application
    createDialog : function( args ) {
        var name = '';
        if( args.name ) {
            name = args.name;
        }
        
        // if there is no name and no class set, assign the default class 'dialog', 'dialogHeader'
        // FIXME: update the close function to be global and use whatever function the user provides
        var close;
        args.close ? close = args.close : close = dialog.closeDialog;
        
        var dialogClass = 'class="customDialog';
        if( args.dialogClass )
        {
            dialogClass += ' ' + args.dialogClass + '"';
        } else {
            dialogClass += '"';
        }
        
        var dataAttributes = '';
        if( args.dataAttributes ) {
            for( var i = 0; i < args.dataAttributes.length; i++ )
            {
                if( args.dataAttributes[i] )
                {
                    dataAttributes += args.dataAttributes[i];
                }
                
                if( i < args.dataAttributes.length - 1 )
                {
                    dataAttributes += ' ';
                }
            }
        }
        
        var headerClass = '';
        if( args.headerClass ) {
            headerClass = 'class="' + args.headerClass + '"';
        }
        
        // FIXME: if there is no title, place the close button in the container
        var titleBody = '';
        if( args.title ) {
            titleBody = '<div id="' + name +
            'CustomDialogHeader"' + headerClass + '><h2>' + args.title + '</h2>' +
            '<div id="customDialogClose"onclick="dialog.closeDialog(\'' +name + '\');">x</div></div>';
        } else {
            titleBody = '<div id="customDialogClose" onclick="dialog.closeDialog(\'' +name + '\');">x</div>';
        }
        
        if( args.textBody ) {
            body = '<div id="' + name + 'DialogText">' + args.textBody + '</div>';
        }
        
        if( args.htmlBody ) {
            body = args.htmlBody;
        }
        
        var bodyClass;
        if( args.bodyClass ) {
            bodyClass = args.bodyClass;
        }
        else {
            bodyClass = 'customDialogBody';
        }
        
        if( args.buttons ) {
            var buttons = '';

            for( var i = 0; i < args.buttons.length; i++ ) {
                var disabled = '';
                var buttonClass = '';
                if( args.buttons[i].disabled ) {
                    disabled = 'disabled="disabled"';
                    buttonClass += 'disabled ';
                }
                
                if( typeof(customDialogButtons) == 'undefined' ) {
                    customDialogButtons = {};
                }
                
                if( args.buttons[i].callback ) {
                    delete customDialogButtons[i + name];
                    customDialogButtons[i + name] = args.buttons[i].callback;
                }
            
                var buttonFunction;
                var parameters = args.buttons[i].parameters ? args.buttons[i].parameters : '';
                var eventType = args.buttons[i].eventType ? args.buttons[i].eventType : 'onclick';
                var buttonID = args.buttons[i].id ? 'id="' + args.buttons[i].id + '" ' : '';
                
                // TODO - If there is no button title, use the button value
                var buttonTitle = args.buttons[i].title ? 'title="' + args.buttons[i].title + '" ' : '';
                buttonClass += args.buttons[i].buttonClass ? args.buttons[i].buttonClass : 'customDialogButton';
                
                
                
                buttons += '<input type="button" ' + disabled + ' name="' + args.buttons[i].name + '" class="' + buttonClass + '" ' + buttonID + eventType + '="' + 'customDialogButtons[\'' + i +name + '\'](' + parameters + ')' + '" value="' + args.buttons[i].value + '"/>';
            }
        }
        
        var buttonContainerClass;
        if( typeof(args.buttonParameters) == 'undefined' ) {
            args.buttonParameters = {};
        }
        
        if( args.buttonParameters.containerClass ) {
            buttonContainerClass = args.buttonParameters.containerClass;
        }
        else {
            buttonContainerClass = 'customDialogButtonContainer';
        }
        
        var buttonElement = '';
        if( typeof(args.buttons) != 'undefined' ) {
            buttonElement = '<div id="' + name + 'DialogButtons" class="' + buttonContainerClass +'">' + buttons + '</div>';
        }
        
        // create a empty array and use it as a way to store a long string/variable which contains the custom dialog
        var dialogBody = '';
        dialogBody += '<div id="' + name + 'DialogWrapper"></div>';
        dialogBody += '<div id="' + name + 'CustomDialog" ' + dialogClass + ' ' + dataAttributes + ' data-name="' + name + '">';
        dialogBody += titleBody;
        dialogBody += '<div id="' + name + 'CustomDialogBody" class="' + bodyClass + '">' + body + '</div>';
        dialogBody += buttonElement;
        dialogBody += '</div>';

        $('body').append( dialogBody );
        
        // SET THE STYLING FOR THE CUSTOM DIALOG
        if( args.bodyClass ) {
            $('#' + name + 'CustomDialogBody').addClass( args.customDialogBodyClass );
        }
        else {
            $('#' + name + 'CustomDialogBody').addClass( 'customDialogBody' );
        }
                
        if( args.maxHeight ) {
            $('#' + name + 'CustomDialog').css( 'max-height', args.maxHeight );
        }
        
        if( args.position ) {
            $('#' + name + 'CustomDialog').css( 'position', args.position );
        }
        else {
            $('#' + name + 'CustomDialog').css( 'position', 'absolute' );
        }
        
        if( args.backgroundColor ) {
            $('#' + name + 'DialogWrapper').css('background-color', args.backgroundColor );
        }
        
        if( args.backgroundOpacity ) {
            // place opacity code here
            // needs to be RGBA since opacity will make all children have the opacity and not just the parent
            //$('#' + name + 'DialogWrapper');
        }
        
        dialog.position( args );
        
        
        if( args.initialLocation) {
            // this is where the animation code will go
            // this controls where in the browser window the dialog will open from
            // this can be the center(default) or from the trigger location
            // 'center', // optional, default is center, but it can be 'trigger'
        }        
        
        if( args.success ) {
            args.success();
        }

        if ( args.responsive ) {
            dialog.responsive();
        }

        $('#' + name + 'CustomDialog').off('click');
        $('#' + name + 'CustomDialog').on('click', function(event) {
            event.stopPropagation();
        });

        // Close the modal when the wrapper is clicked
        $('#' + name + 'DialogWrapper').off('click');
        $('#' + name + 'DialogWrapper').on('click', function() {
            dialog.closeDialog( name );
        });
    },
    
    position : function( args ) {
        var name = '';
        if( args && args.name ) {
            name = args.name;
        }
    
        if( args && args.top ) {
            customDialogTop = args.top;
        }
        else {
            var windowHeightHalf = window.innerHeight / 2;
            var customDialogHeight = $('#' + name + 'CustomDialog').height();
            var customDialogHeightHalf = customDialogHeight / 2;
            customDialogTop = windowHeightHalf - customDialogHeightHalf;
            
            if( customDialogTop < 0 ) {
                customDialogTop = 50;
            }
        }
        
        var customDialogLeft;
        if( args && args.left ) {
            customDialogLeft = args.left;
        }
        else {
            var windowWidth = $(window).width();
            var windowWidthHalf = windowWidth / 2;
            var customDialogWidth = $('#' + name + 'CustomDialog').outerWidth();
            var customDialogWidthHalf = customDialogWidth / 2;

            if ( customDialogWidth >= windowWidth ) {
                customDialogLeft = 0;
            } else {
                customDialogLeft = windowWidthHalf - customDialogWidthHalf;
            }
        }

        $('#' + name + 'CustomDialog').css( 'left', customDialogLeft );
        $('#' + name + 'CustomDialog').css( 'top', customDialogTop );
    },

    responsive: function() {

        var updatePosition = function() {
            var dialogs = $('.customDialog');
            var name;

            $.each( dialogs, function( key, value ) {
                name = $(value).attr('data-name');
                dialog.position({ name: name });
            });
        };

        // Center the dialog when resizing
        $(window).resize( function() {
            if( timer ) {
                clearTimeout(timer);
            }
         
            var timer = setTimeout( function() {
                updatePosition();
            }, 100 );    
        });
    }
}
