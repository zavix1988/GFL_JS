console.time('Vue');

Vue.component('todo-item', {
    template: `
                <li>
                    <input type="text" class="edit-input" v-model="edit_val" v-if="edit" @keyup.enter="apply(index)">
                    <span class="item-text" v-else>{{ item }}</span>
                    <button type="button" @click="remove(index)">X</button>
                    <button type="button" @click="apply(index)" v-if="edit">Apply</button>
                    <button type="button" @click="edit_method" v-else>Edit</button>
                </li>         
            `,
    props: ['index', 'item'],
    data: function () {
        return {
            edit_val: '',
            edit: false
        }
    },
    methods: {
        remove: function (key) {
            this.$emit('remove', key);
        },
        apply: function () {
            this.edit = false;
            this.$emit('apply', this.edit_val);
        },
        edit_method: function () {
            this.edit = true;
            this.edit_val = this.item;
        }
    },
    computed: {}
});


var todo_app = new Vue({
    el: '#todoVue',
    data: function () {
        return {
            add_val: '',
            list: JSON.parse(localStorage.todoVue || '[]')
        }
    },
    methods: {
        add: function () {
            console.time('Vue add')
            this.list.push(this.add_val);
            this.add_val = '';
            console.timeEnd('Vue add')
        },
        remove: function (index) {
            this.list.splice(index, 1);
        },
        apply: function (index, val) {
            this.$set(this.list, index, val);
        }
    },
    watch: {
        list: function () {
            localStorage.todoVue = JSON.stringify(this.list);
        }
    }

});

console.timeEnd('Vue');