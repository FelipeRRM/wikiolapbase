$(function () {

    var data = [];
    var idInit = 0;

    $('.select2').select2({
        tags: true
    });

    $('#addHierarchy').click(function () {
        var columns = [];
        var dataTable = $('#dataTableId thead tr th .th-inner');
        dataTable.each(function () {
            var cellText = $(this).html().trim();
            columns.push(cellText);
        });
        var htmlElement = $('#hierarquias');
        var idDivWrapper = 'hierarchyWrapper' + idInit;
        htmlElement.append('<div id="' + idDivWrapper + '" class="col-md-6 hierarchyWrapper"> </div>');
        var newHtmlElement = $('#' + idDivWrapper + '');
        var idSelect = 'selectHierarchy' + idInit;
        var idButtonAdd = 'selectButton' + idInit;
        var idButtonDelete = 'deleteButton' + idInit;
        var options = '';
        for (i = 0; i < columns.length + 1; i++) {
            var option = '<option value="' + columns[i] + '">' + columns[i] + '</option>';
            options = option + options;
        }
        var treeElementWrapper = 'treeWrapper' + idInit;
        var treeElement = 'tree' + idInit;
        newHtmlElement.append('<div id="hierarquiaNameWrapper' + idInit + 'Id" class="hierarquiaNameWrapper form-group"> </div>');
        $('#hierarquiaNameWrapper' + idInit + 'Id').append('</br><label id="hierarquiaLabel' + idInit + 'Id" class="col-md-6 control-label" for="hierarquia' + idInit + '">Nome da Hierarquia</label>');
        $('#hierarquiaNameWrapper' + idInit + 'Id').append('<div id="hierarquiaDiv' + idInit + 'Id" class="col-md-6"> </div>');
        $('#hierarquiaDiv' + idInit + 'Id').append(' <input id="hierarquia' + idInit + 'Id" name="hierarquia' + idInit + 'Name" type="text" placeholder="" class="form-control input-hierarchy-name">');
        newHtmlElement.append('<div class="treeElement" id="' + treeElementWrapper + '"</div>');
        $('#' + treeElementWrapper + '').append('<div" id="' + treeElement + '"</div>');
        newHtmlElement.append('<select class="form-control selectHierarchy" id="' + idSelect + '"' + options + '</select>');
        newHtmlElement.append('<span class="btn btn-success btn-adicionar" id="' + idButtonAdd + '"> </span >');
        var button = $('#' + idButtonAdd + '');
        button.append('<i class="glyphicon glyphicon-plus"> </i> Adicionar nível');
        newHtmlElement.append('</br><span class="btn btn-danger btn-remove" id="' + idButtonDelete + '"> </span >');
        var buttonDelete = $('#' + idButtonDelete + '');
        buttonDelete.append('<i class="glyphicon glyphicon-minus"> </i> Remover hierarquia');
        options = [];
        columns = [];
        var newEntry = {
            select: idSelect,
            tree: [],
            numberOfNodes: 0
        };
        data.push(newEntry);
        idInit = idInit + 1;
        $('#' + idButtonAdd).click(function () {

            var newValue = $('#' + idSelect + '').val();
            var newNode = {
                text: newValue,
                tags: [],
            };
            var selectData = [];
            for (var index in data) {
                if (data[index].select == idSelect) {
                    if (data[index].tree.length === 0) {
                        newNode.tags = [1];
                        data[index].tree.push(newNode);
                        data[index].tree[0].nodes = [];
                        data[index].numberOfNodes = 0;
                    }
                    else {
                        var root = data[index].tree[0];
                        root.nodes.push(newNode);
                    }
                    data[index].numberOfNodes = data[index].numberOfNodes + 1;
                    data[index].tree[0].tags = [data[index].numberOfNodes];
                    selectData = data[index].tree;
                }
            }
            $('#' + treeElement + '').treeview({
                data: selectData,
                levels: 10,
                color: "#000000",
                backColor: "#FFFFFF",
                showTags: true,
                emptyIcon: '',
            });
        });

        $('#' + idButtonDelete).click(function () {
            BootstrapDialog.show({
                title: 'Atenção',
                message: 'Tem certeza que deseja excluir essa hierarquia?',
                closable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                buttons: [
                    {
                        label: 'Não',
                        cssClass: 'btn-danger',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    },
                    {
                        label: 'Sim',
                        cssClass: 'btn-primary',
                        action: function (dialogRef) {
                            newHtmlElement.remove();
                            dialogRef.close();
                        }
                    },
                ]
            });
        });
    });

    $('#goBackToFirstStepId').click(function (event) {
        window.location.replace('/');
        $('html, body').animate({ scrollTop: 0 }, 'fast');

    });

    $('#goBackToSecondStepId').click(function (event) {
        var secondStep = $('#secondStepId');
        var thirdStep = $('#thirdStepId');
        var secondBreadcrumb = $('#step2Breadcrumb');
        var thirdBreadcrumb = $('#step3Breadcrumb');
        secondStep.show();
        secondBreadcrumb.addClass('active');
        secondBreadcrumb.removeClass('disabled');
        thirdStep.hide();
        thirdBreadcrumb.addClass('disabled');
        thirdBreadcrumb.removeClass('active');
        $('html, body').animate({ scrollTop: 0 }, 'fast');

    });

    $('#goBackToThirdStepId').click(function (event) {
        var finalStep = $('#finalStepId');
        var thirdStep = $('#thirdStepId');
        var thirdBreadcrumb = $('#step3Breadcrumb');
        var finalBreadcrumb = $('#step4Breadcrumb');
        finalStep.hide();
        finalBreadcrumb.addClass('disabled');
        finalBreadcrumb.removeClass('active');
        thirdStep.show();
        thirdBreadcrumb.addClass('active');
        thirdBreadcrumb.removeClass('disabled');
        $('html, body').animate({ scrollTop: 0 }, 'fast');

    });

    $('#goToThirdStepId').click(function (event) {
        var secondStep = $('#secondStepId');
        var thirdStep = $('#thirdStepId');
        var secondBreadcrumb = $('#step2Breadcrumb');
        var thirdBreadcrumb = $('#step3Breadcrumb');
        secondStep.hide();
        secondBreadcrumb.removeClass('active');
        secondBreadcrumb.addClass('disabled');
        thirdStep.show();
        thirdBreadcrumb.removeClass('disabled');
        thirdBreadcrumb.addClass('active');
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    });

    $('#goToFinalStepId').click(function (event) {
        var thirdStep = $('#thirdStepId');
        var finalStep = $('#finalStepId');
        var thirdBreadcrumb = $('#step3Breadcrumb');
        var finalBreadcrumb = $('#step4Breadcrumb');
        thirdStep.hide();
        thirdBreadcrumb.removeClass('active');
        thirdBreadcrumb.addClass('disabled');
        finalStep.show();
        finalBreadcrumb.removeClass('disabled');
        finalBreadcrumb.addClass('active');
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    });

    $('#submitMetadataId').click(function (event) {
        var columns = [];
        var tags = [];
        var hierarquias = [];

        //Colunas
        var dataTable = $('#dataTableId thead tr th .th-inner');
        dataTable.each(function () {
            var cellText = $(this).html().trim();
            columns.push(cellText);
        });

        //Hierarquias
        if (data.length > 0) {
            for (var index in data) {
                var numberOfNodes = data[index].numberOfNodes;
                var hierarquiaId = 'hierarquia' + index + 'Id';
                var hierarchyTitle = $('#' + hierarquiaId).val();
                var newHierarchy = {
                    'hierarchy': hierarchyTitle,
                    'levels': []
                };
                if (data[index].tree[0] !== undefined) {
                    var firstEntry = {
                        "level": 0,
                        "column": data[index].tree[0].text
                    };
                    newHierarchy.levels.push(firstEntry);
                }
                var next = data[index].tree[0];
                for (i = 1; i < numberOfNodes + 1; i++) {
                    if (next.nodes !== undefined) {
                        var newEntry = {
                            "level": i,
                            "column": next.nodes[0].text
                        };
                        newHierarchy.levels.push(newEntry);
                        next = next.nodes[0];
                    }
                }
                hierarquias.push(newHierarchy);
            }
        }

        //Tags
        for (var colIndex in columns) {
            var colTags = $('#' + columns[colIndex] + '').select2("val");
            if (colTags !== null) {
                var newTagEntry = {
                    "column": columns[colIndex],
                    "colTags": colTags
                };
                tags.push(newTagEntry);
            }
        }

        var jsonRequest = {
            "title": $('#title').val(),
            "description": $('#descriptionId').val(),
            "source": $('#source').val(),
            "tags": tags,
            "columns": columns,
            "hierarchies": hierarquias,
        };
        waitingDialog.show('Seu dataset está sendo carregado em nosso repositório!');
        $.ajax({
            type: "POST",
            url: "/upload_metadata_action/",
            data: JSON.stringify(jsonRequest),
            success: function (result) {
                waitingDialog.hide();
                BootstrapDialog.show({
                    title: 'Informação',
                    message: 'Seu dataset foi carregado com sucesso!',
                    onhide: function (dialogRef) {
                        window.location.replace('/');
                        $('html, body').animate({ scrollTop: 0 }, 'fast');
                    },
                    closable: true,
                    closeByBackdrop: false,
                    closeByKeyboard: false,
                    buttons: [
                        {
                            label: 'Ok',
                            cssClass: 'btn-default',
                            action: function (dialogRef) {
                                dialogRef.close();
                            }
                        }
                    ]
                });

            },
            error: function (result) {
                waitingDialog.hide();
                BootstrapDialog.show({
                    title: 'Atenção',
                    message: 'Ocorreu um erro. Tente novamente mais tarde ou entre em contato com os administradores.',
                    onhide: function (dialogRef) {
                        $('html, body').animate({ scrollTop: 0 }, 'fast');
                    },
                    closable: true,
                    closeByBackdrop: false,
                    closeByKeyboard: false,
                    buttons: [
                        {
                            label: 'Ok',
                            cssClass: 'btn-default',
                            action: function (dialogRef) {
                                dialogRef.close();
                            }
                        }
                    ]
                });
            }

        });
    });
    
});