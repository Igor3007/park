import $ from 'jquery';

$(document).ready(function () {

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    $(document).on('keyup', 'input[type=text], input[type=email], textarea', function(){
        
        let value = $(this).val();
        let elem = $(this);

        

        switch($(this).attr('type')){

            case 'email': 

                if(!validateEmail(value)){
                    elem.attr('area-valid', 'false')
                    elem.parent().find('.tooltip').text('Не корректный Email')
                }else{
                    elem.attr('area-valid', 'true')
                }

            break;
            

            case 'text': 

                switch (elem.data('valid-type')){
                    case 'min8':
                        if(value.length < 8){
                            elem.attr('area-valid', 'false')
                        }else{
                            elem.attr('area-valid', 'true')
                        }
                    break;

                    default: 

                        if(value.length < 0){
                            elem.attr('area-valid', 'false')
                        }else{
                            elem.attr('area-valid', 'true')
                        }
                }

            break;

            
            default: 
                if(value.length < 0){
                    elem.attr('area-valid', 'false')
                }else{
                    elem.attr('area-valid', 'true')
                }
        }

        if(!value){
            elem.removeAttr('area-valid')
        }

    })

   
    
        
        $('.input-material input').each(function(){
            if($(this).val() != ''){
                $(this).attr('area-valid', '')
            }
        })


    //upload files
     function sendFiles(files, callback) {
        for (var i = 0; i < files.length; i++) {
            var file = files.item(i);
            if (file.size > 2200000) {
                alert('Не больше 2 мб')
                return false;
            }
            callback(file);
        }
    }


    /* Прикрепить файл резюме */
    $(document).on('change', '[for=attach-file] > input', function () {
        let files = this.files;
        let elem = $(this);

        sendFiles(files, function (data) {
            elem.parents('.form__subitem')
                .find('.upload-files')
                .append('<li>'+data.name+'</li>');
        
        });

    });
});