var emotion = {
    
    data: {
        source: [],
        symptoms: [],
        lifestyle: [],
        people: [],
        mood: [],
        message: [],
    },

    content: {
        typesOfStress: [
            'Work Stress',
            'Personal Stress',
            'Family Stress',
            'Financial Stress',
            'Social Stress',
            'Environmental Stress'
        ],

        stressSymptoms: [
            'Muscular',
            'GI and GenitoUrinary',
            'Emotional',
            'Cardiovascular and Lung',
            'Cognitive',
            'Hormonal',
            'Immune System'
        ],

        lifestyleCondition: [
            'I didn\'t eat well',
            'I\'m tired',
            'I\'m lonely',
            'I need to exercise',
            'I\'m over weight',
            'I\'m still smoking',
            'I drank too much alcohol',
            'I ate too much',
            'I drank too much coffee',
            'Add new lifestyle condition'
        ],

        mood: [
            'Angry',
            'Bored',
            'Calm',
            'Confident',
            'Confused',
            'Cool',
            'Depressed',
            'Elated',
            'Embarrassed',
            'Evil',
            'Flirt',
            'Forgetful',
            'Frustrated',
            'Happy',
            'Hungry',
            'Impatient',
            'Insecure',
            'Irrated',
            'Jealous',
            'Lonely',
            'Nervous',
            'Sad',
            'Scared',
            'Shy',
            'Tired'
        ]
    },

    checkData: function(type, option) {
        var match = false;
        $.each(this.data[type], function(key, value) {
            if (option === value) {
                match = true;
            }
        });

        if (!match) {
            this.data[type].push(option);
        }
    },

    sourcesOfStressSelection: function() {
        //alert('boom');
    },

    selectionDropdown: function() {
        $('.selection').on('click', function(event) {
            var target = $(event.target);
            var type = target.attr('data-type');

            dialog.createDialog({
                title : 'Types of Stress',
                htmlBody : '<p>Hello World!</p>',
                buttons  : [
                    {
                        value    : 'Ok',
                        callback : function()
                        {
                            alert('You just pressed Ok');
                        }
                    }
                ]
            });

            target.find('.options').toggle();
        });
    },

    optionSelection: function() {
        $('.options').find('li').on('click', function(event) {
            var target = $(event.target);
            var option = target.attr('data-option');
            var selectionContainer = target.parents('.selection');
            var options = target.parents('.options');

            target.siblings().removeClass('selected');
            target.addClass('selected');

            if (typeof(option) === 'undefined') {
                option = target.text();
            }

            selectionContainer.find('.selected_item').text( option );
            options.hide();
        });
    },

    multipleChoiceDropdown: function() {
        $('.multiple_choice_selection').on('click', function(event) {
            var target = $(event.target);

            dialog.createDialog({
                title : 'Types of Stress',
                htmlBody : '<p>Hello World!</p>',
                buttons  : [
                    {
                        value    : 'Ok',
                        callback : function()
                        {
                            alert('You just pressed Ok');
                        }
                    }
                ]
            });
            
            target.find('.multiple_choice').toggle();

            target.find('.selected_item').text( emotion.moods );
        });
    },

    multipleChoiceSelection: function() {
        var that = this;
        $('.multiple_choice').find('li').on('click', function(event) {
            var target = $(event.target);
            var option = target.attr('data-option');
            var selectionContainer = target.parents('.multiple_choice_selection');
            var options = target.parents('.multiple_choice');
            var type = selectionContainer.attr('data-type');

            target.toggleClass('selected');

            if (typeof(option) === 'undefined') {
                option = target.text();
            }


            that.checkData( type, option );
            selectionContainer.find('.selected_item').text( that.data[type].join(' ') );
            //options.hide();
        });
    },

    saveCurrentEmotion: function() {

        alert('It\'s clobbering time!');
        // Get the saved emotion status's

        // Send a response to the server to save the data
        console.log(this.data);

        // On success launch a dialog window using dryDialog
    },

    saveEvent: function() {
        $('#saveEmotion').on('click', function() {
            emotion.saveCurrentEmotion();
        });
    },
    
    init: function() {
        this.sourcesOfStressSelection();
        this.selectionDropdown();
        this.optionSelection();
        this.multipleChoiceDropdown();
        this.multipleChoiceSelection();
        this.saveEvent();
    }
};

$(function() {
    emotion.init();
});

