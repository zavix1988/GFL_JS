(function(){
    var dom = document.querySelector('#shop'),
        products_list = dom.querySelector('#products_list'),
        cart = dom.querySelector('#cart');
        
    var products = [
        {
            name: 'esp32',
            price: 5,
        },
        {
            name: 'esp8266',
            price: 2,
        },
        {
            name: 'arduino nano',
            price: 4,
        },
        {
            name: 'Raspberry Pi3',
            price: 50,
        },
        {
            name: 'OrangePi + 2e',
            price: 54,
        },
        {
            name: 'Heltec LoRa 32',
            price: 7,
        },
    ];
    var cart_list = JSON.parse(localStorage.cart || '{}');

    function save() {
        localStorage.cart = JSON.stringify(cart_list)
    }
    
    var build_counter = function () {
        var counter = 0;
        for (var index in cart_list) {
            counter += +cart_list[index];
        }
        dom.querySelector('#counter').innerText = 'Count ' + counter

    };

    var build_total = function () {
        var total = 0;
        for (var index in cart_list) {
            var product = products[index];
            total += cart_list[index] * product.price;
        }
        dom.querySelector('#total').innerText = 'Total = ' + total
    };

    var build_list = function() {
        products_list.innerHTML = '';
        products.forEach(function (product, index) {
            var item = make_item(product.name + ' $' + product.price + '<button type="button" class="js_add">Add</button>');
            products_list.appendChild(item);
            setListItemActions(item, index);
        });
    };

    var make_item = function(value) {
        var li = document.createElement('li');
        li.innerHTML = value;
        return li;
    }

    var setListItemActions = function(item, index) {
        var add_btn = item.querySelector('.js_add');
        add_btn.addEventListener('click', function(){
            if (void 0 === cart_list[index]) {
                cart_list[index] = 1;
            } else {
                cart_list[index]++;
            }
            changeAction();
            build_cart()
        });
    }

    var setCartItemActions = function(item, index) {

        var remove_btn = item.querySelector('.js_remove');

        remove_btn.addEventListener('click', function () {
            if (0 === cart_list[index]) {
                delete cart_list[index];
            } else {
                cart_list[index]--;
            }
            changeAction();
            build_cart()
        });
    }

    var build_cart = function () {

        cart.innerHTML = '';
        for (index in cart_list) {

            var product = products[index];
            var count = cart_list[index];
            var node = make_item(product.name + ' x ' + count + '<button data-index="' + index + '" type="button" class="js_remove">X</button>');
            cart.appendChild(node);
            setCartItemActions(node, index)

        }
        build_counter();
        build_total();
    };


    function changeAction() {
        build_list();
        save();
    }
    
    build_list();
    build_cart();
    build_counter();
    build_total();

}())