var items_list = new Vue({
    el: '#shop',
    data: function() {
        return {
            items: [
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
                    price: 175,
                }
            ],
            list: JSON.parse(localStorage.vue_shop || '{}')  
        }
    },
    methods: {
        add: function(val){
             for (key in this.items) {
                if (key == val) {
                    this.list[key]++;
                    console.log(this.list[key]);
                }else{
                    this.list[key] = 1;
                }
            }
            this.save();
        },
        remove: function(key) {
            this.pop(this.list, key);
            this.save();
        },
        save: function(){
            localStorage.vue_shop = JSON.stringify(this.list);
        }
    },
});