Vue.component('calendar', {
    template: `
                        <table id="calendar2">
                        <thead>
                            <tr>
                                {{ setDefaultVals }}
                                <button @click="prevMonth">‹</button>
                                <td colspan="5">{{ monthYear }}</td>
                                <button @click="nextMonth">›</button>
                            </tr>
                            <tr>
                                <td>Mon</td>
                                <td>Tue</td>
                                <td>Wed</td>
                                <td>Thu</td>
                                <td>Fri</td>
                                <td>Sat</td>
                                <td>Sun</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="week in days">
                                <td v-for="day in week">{{ day.dayNum }}</td>
                            </tr>
                        </tbody>
                    </table>`,
    data: function () {
        return {
            date: new Date(),
            monthes: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'October', 'December'],
            selectedMonth: undefined,
            selectedYear: undefined,
            lastDay: undefined,
            firstWeekDay: undefined,
            lastWeekDay: undefined,
            days: []
        }
    },
    methods: {
        currentMonth: function () {
            return this.selectedMonth = this.date.getMonth();
        },
        currentYear: function () {
            return this.selectedYear = this.date.getFullYear();
        },
        showMonth: function (month) {
            this.selectedMonth = month;
            return this.monthes[month];
        },
        nextMonth: function () {
            this.getFirstWeekDay();
            this.getLastDay();
            this.getLastWeekDay();
            this.getMonthesDays();
            if (this.selectedMonth < 11) {
                return this.selectedMonth++;
            }
            this.selectedYear++;
            return this.selectedMonth = 0;
        },
        prevMonth() {
            this.getFirstWeekDay();
            this.getLastDay();
            this.getLastWeekDay();
            this.getMonthesDays();
            if (this.selectedMonth > 0) {
                return this.selectedMonth--;
            }
            this.selectedYear--;
            return this.selectedMonth = 11;
        },
        getLastDay: function () {
            this.lastDay = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate()
        },
        getFirstWeekDay: function () {
            this.firstWeekDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
        },
        getLastWeekDay: function () {
            this.getLastDay();
            this.lastWeekDay = new Date(this.selectedYear, this.selectedMonth, this.lastDay).getDay()
        },
        getMonthesDays: function () {
            var week = 0;
            this.days[week] = [];
            for (var i = 1; i <= this.lastDay; i++) {
                if (new Date(this.selectedYear, this.selectedMonth, i).getDay() != 1) {
                    this.days[week].push({
                        dayNum: i,
                        dayWeek: new Date(this.selectedYear, this.selectedMonth, i).getDay()
                    })
                } else {
                    week++;
                    if (!this.days[week]) {
                        this.days[week] = [];
                    }
                    this.days[week].push({
                        dayNum: i,
                        dayWeek: new Date(this.selectedYear, this.selectedMonth, i).getDay()
                    })
                }
            }

        },
        formatFirstWeek: function () {
            //console.log(this.days[0].length)
            for (var i = this.days[0].length; i < 7; i++) {
                this.days[0].unshift({
                    dayNum: undefined,
                    dayWeek: i
                });
            }
        }
    },
    computed: {
        setDefaultVals: function () {
            this.getFirstWeekDay();
            this.getLastWeekDay();
            this.getLastDay();
            this.getMonthesDays();
            this.formatFirstWeek();
        },
        monthYear: function () {
            this.days = [];
            if (void 0 === this.selectedMonth) {
                this.selectedMonth = this.currentMonth();
            }
            if (void 0 === this.selectedYear) {
                this.selectedYear = this.currentYear();
            }
            return this.monthes[this.selectedMonth] + " " + this.selectedYear;
        }
    }
});
var app = new Vue({
    el: '#app'
})