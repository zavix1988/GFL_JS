Vue.component('calendar', {
    template: `
    <table>
        <thead>
            <tr>
                {{ setDefaultVals }}
                <td><button @click="prevMonth">‹</button></td>
                <td colspan="5">{{ monthYear }}</td>
                <td><button @click="nextMonth">›</button></td>
            </tr>
            <tr v-if="beginWeekMonday">
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
            </tr>
            <tr v-else>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </tr>            
        </thead>
        <tbody>
            <tr>
                <td v-for="day in daysInMonth">{{ day }}</td>
            </tr>
        </tbody>
    </table>
    `,
    data() {
        return {
            date: new Date,
            monthes: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'October', 'December'],
            selectedMonth: undefined,
            selectedYear: undefined,
            lastDay: undefined,
            beginWeekMonday: false,
            daysInMonth: undefined,

        }
    },
    methods: {
        getCurrentMonth: function () {
            return this.selectedMonth = this.date.getMonth();
        },
        getCurrentYear: function () {
            return this.selectedYear = this.date.getFullYear();
        },
        getDaysInMonth: function() {
           return this.daysInMonth =  33 - new Date(this.selectedYear, this.selectedMonth, 33).getDate()
        }

    },
    created: function() {
        this.getCurrentMonth();
        this.getCurrentYear();   
        this.getDaysInMonth();   
    },
    computed: {
        monthYear(){
            return this.monthes[this.date.getMonth()];
        }
    }
});


var app = new Vue({
    el: '#app'
})