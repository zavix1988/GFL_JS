(function ($) {
    var $products_list = $('#products_list');
    var $cart = $('#cart');
    var products = [
        {
            name: 'Product 1',
            price: 1
        },
        {
            name: 'Product 3',
            price: 34
        },
        {
            name: 'Product 8',
            price: 17.5
        },
        {
            name: 'Product 2',
            price: 175
        }
    ];

    var cart = JSON.parse(localStorage.cart || '{}');

    var save_cart = function () {
        localStorage.cart = JSON.stringify(cart);
    };

    var build_cart = function () {
        console.log(cart);
        var cart_html = Object.keys(cart).map(function (prod_index) {
            var product = products[prod_index];
            var count = cart[prod_index];
            return '<li>' + product.name + ' x ' + count + '<button data-index="' + prod_index + '" type="button" class="js_remove">X</button></li>'
        }).join('');

        $cart.html(cart_html);
        build_counter();
        build_total();
    };


    var build_counter = function () {
        var counter = 0;
        for (var index in cart) {
            counter += +cart[index];
        }
        $('#counter').text('All ' + counter);

    };

    var build_total = function () {
        var total = 0;
        for (var index in cart) {
            var product = products[index];
            total += cart[index] * product.price;
        }
        $('#total').text('Total = ' + total);
    };

    var products_html_arr = products.map(function (product, index, current_array) {
        return '<li>' +
            product.name + ' $' + product.price + '<button type="button" class="js_add">Add</button>' +
            '</li>';
    })

    $products_list.html(products_html_arr.join(''));

    $products_list.on('click', '.js_add', function () {
        var $li = $(this).parent();
        var index = $li.index();
        if (void 0 === cart[index]) {
            cart[index] = 1;
        } else {
            cart[index]++;
        }
        save_cart();
        build_cart();
    });

    $cart.on('click', '.js_remove', function () {
        var index = ($(this).data('index'));
        delete cart[index];
        build_cart();
        save_cart();
    });

    build_counter();
    build_cart();

}(jQuery))