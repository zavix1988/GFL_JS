new Vue({
    el: '#app',
    data: function(){
        return {
            message: 'Hello Vue',
            todo: JSON.parse(localStorage.todo || '{}')
        }
    },
    methods: {
        add: function(){
            this.todo.push(this.message);
            this.message = '';
        },
        remove: function(key, e) {
            console.log(e);
            this.todo.splice(key, 1);
        }
    },
    computed: {
        count_items: function() {
            return this.todo.length;
        }
    },
    watch: {
        todo: function(newVal) {
            localStorage.todo = JSON.stringify(newVal);
        },
        message: function(a, b){
            console.log('new', a);
            console.log('old', b);
        }
    }

});