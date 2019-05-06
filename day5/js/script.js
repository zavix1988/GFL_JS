(function($){

    $(function(){

    });

    var $dom = $('#todo'),
        $add_input = $dom.find('.js_add_input'),
        $add_btn = $dom.find('.js_add_button'),
        $list = $dom.find('.js_list'),
        $list_arr = $.parseJSON(localStorage.getItem('todo') || '[]'),
        $item_template = $('#todo_item_template').text();

    function save(){
        localStorage.todo = JSON.stringify($list_arr);
    }    
   
    function buildList() {
        $list.html('');

        $($list_arr).each(function(index, text){
            var item = makeItem(text);
            $list.append(item);
            setItemActions(item, index);
        });
    };

    
    function makeItem(value) {
        var $li = $('<li>');
        $li.html($item_template.replace(/{{val}}/g, value));
        return $li;
    }

    function setItemActions(item, index) {
        var $remove_btn = item.find('.js_item_remove_btn'),
            $edit_btn = item.find('.js_item_edit_btn'),
            $edit_input = item.find('.js_item_input'),
            $apply_btn = item.find('.js_item_apply_btn'),
            $item_text = item.find('.js_item_text');
            $remove_btn.on('click', function() {
            $list_arr.splice(index, 1);
            changeAction();
        });

        $edit_btn.on('click', function() {
            $edit_input.show();
            $item_text.hide();
        });

        $apply_btn.on('click', function(){
            $list_arr[index] = edit_input.value;
            changeAction();
        });
    }

    function changeAction() {
        buildList();
        save();
    }

    $add_btn.on('click', function() {
        var $text = $add_input.val();
        $list_arr.push($text);
        $add_input.val('');
        changeAction();
    });
    
    buildList();

}(jQuery));