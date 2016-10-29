var Editor = function (id) {

    var editor = $('#' + id);

    return {
        init: function (callback) {
            editor.summernote({
                height: 300,
                callbacks: {
                    onChange: callback
                }
            });
        },
        get: function(){
            return editor.summernote('code');
        },
        set: function(markupStr){
            editor.summernote('code', markupStr)
        },
        reset: function(){
            editor.summernote('reset');
        },
        destroy: function(){
            editor.summernote('destroy');
        }
    };

};
