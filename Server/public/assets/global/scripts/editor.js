var Editor = function (id) {

    var editor = $('#' + id);

    return {
        init: function () {
            editor.summernote({height: 300});
        },
        get: function(){
            return editor.summernote('code');
        },
        set: function(markupStr){
            editor.summernote('code', markupStr)
        },
        destroy: function(){
            editor.summernote('destroy');
        },
        onChange: function(callback){
            editor.summernote({
                callbacks: {
                    onChange: callback
                }
            });
        }
    };

};
