function CKEditorUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        return new CKUploadAdapter( loader );
    };
}

ClassicEditor
    .create( document.querySelector( '.editor' ), {

        toolbar: {
            items: [
                'heading',
                '|',
                'undo',
                'redo',
                'fontFamily',
                'fontColor',
                'fontBackgroundColor',
                'fontSize',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'highlight',
                '|',
                'alignment',
                'bulletedList',
                'numberedList',
                'todoList',
                '|',
                'outdent',
                'indent',
                '|',
                'horizontalLine',
                'link',
                'imageUpload',
                'imageInsert',
                'pageBreak',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'specialCharacters',
                'restrictedEditingException',
                'removeFormat',
                'code',
                'htmlEmbed',
                'codeBlock',
                'subscript',
                'superscript'
                //'sourceEditing'
            ]
        },
        language: 'ko',
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                'linkImage'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ]
        },
        mediaEmbed: { previewsInData: true, removeProviders: ["instagram", "twitter", "googleMaps", "flickr", "facebook"] },
        extraPlugins: [CKEditorUploadAdapterPlugin],
        licenseKey: '',
    } )
    .then( editor => {
        window.editor = editor;
    } )
    .catch( error => {
        console.error( '웁스, 문제가 발생했습니다.!' );
        console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
        console.warn( 'Build id: f21cq9op18d-6cie4gmgkw8l' );
        console.error( error );
    } );