var datePicker = {
            // <div class="input" @click="togglePanel" v-if="range">\
            //     {{tmpStartDate}}&nbsp;{{tmpStartMonth + 1 | month(language)}}\
            //     <span>{{underLine}}</span>\
            //     {{tmpEndDate}}&nbsp;{{tmpEndMonth + 1 | month(language)}}\
            // </div>\
            // <div v-else class="input" @click="togglePanel" v-text="value"></div>\
	template: '\
    <div class="date-picker">\
        <div :class="[inputWrapper,{customRange: customRange}]" @mouseenter="showCancel = true" @mouseleave="showCancel = false">\
            <div class="input" @click="togglePanel" v-text="range ? inputFromat(value[0])  + underLine + inputFromat(value[1]) : value"></div>\
            <transition name="fade">\
                <img class="cancel-btn" v-show="showCancel" @click="clear">\
            </transition>\
        </div>\
        <transition name="toggle">\
            <div class="date-panel" v-show="panelState" :style="coordinates">\
                <div class="panel-header" v-show="panelType !== yearString">\
                    <div class="arrow-left" @click="prevMonthPreview()"></div>\
                    <div class="year-month-box">\
                        <div class="year-box" @click="chType(yearString)" v-text="tmpYear"></div>\
                        <div class="month-box" @click="chType(monthString)">{{tmpMonth + 1 | month(language)}}</div>\
                    </div>\
                    <div class="arrow-right" @click="nextMonthPreview()"></div>\
                </div>\
                <div class="panel-header" v-show="panelType === yearString">\
                    <div class="arrow-left" @click="chYearRange(0)"></div>\
                    <div class="year-range">\
                        <span v-text="yearList[0]"></span>\
                        <div>&nbsp;-&nbsp;</div>\
                        <span v-text="yearList[yearList.length - 1]"></span>\
                    </div>\
                    <div class="arrow-right" @click="chYearRange(1)"></div>\
                </div>\
                <div class="type-year" v-show="panelType === yearString">\
                    <ul class="year-list">\
                        <li v-for="item in yearList"\
                            v-text="item"\
                            :class="{selected: isSelected(yearString, item), invalid: validateYear(item)}" \
                            @click="selectYear(item)"\
                        >\
                        </li>\
                    </ul>\
                </div>\
                <div class="type-month" v-show="panelType === monthString">\
                    <ul class="month-list">\
                        <li v-for="(item, index) in monthList"\
                            :class="{selected: isSelected(monthString, index), invalid: validateMonth(index)}" \
                            @click="selectMonth(index)"\
                        >\
                            {{item | month(language)}}\
                        </li>\
                    </ul>\
                </div>\
                <div class="type-date" v-show="panelType === dateString">\
                    <ul class="weeks">\
                        <li v-for="item in weekList">{{item | week(language)}}</li>\
                    </ul>\
                    <ul class="date-list">\
                        <li v-for="(item, index) in dateList"\
                            :class="{rangeSelected: item.rangeSelected && item.currentMonth,firstRangeSelected: item.firstRangeSelected,lastRangeSelected: item.lastRangeSelected,preMonth: item.previousMonth, nextMonth: item.nextMonth,\
                                invalid: validateDate(item), firstItem: (index % 7) === 0, lastItem: ((index+1) % 7) === 0}"\
                            @click="selectDate(item)" @mouseenter="hover(item)" @mouseleave="leave(item)">\
                            <div class="message" :class="{selected: isSelected(dateString, item)}">\
                                <div :class="[bg,{\
                                firstSelected: item.value === tmpStartDate && item.month === tmpStartMonth && item.year === tmpStartYear,\
                                lastSelected: item.value === tmpEndDate && item.month === tmpEndMonth && item.year === tmpEndYear,\
                                onlySelected: tmpStartDate === tmpEndDate && tmpStartMonth === tmpEndMonth && tmpStartYear === tmpEndYear,\
                                selecting: rangeStart,\
                                }]"></div><span v-text="item.value"></span>\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        </transition>\
    </div>',
        created: function(){
            var c = this;
            bus.$on('rangeChange', function () {
                if(c.range){
                    if(Object.prototype.toString.call(c.value).slice(8, -1) !== 'Array'){
                        throw new Error('Binding value must be an array in range mode.')
                    }
                    if(c.value.length){
                        var rangeStart = c.value[0].split('-')
                        var rangeEnd = c.value[1].split('-')
                        c.tmpStartYear = Number(rangeStart[0])
                        c.tmpStartMonth = Number(rangeStart[1]) - 1
                        c.tmpStartDate = Number(rangeStart[2])
                        c.tmpEndYear = Number(rangeEnd[0])
                        c.tmpEndMonth = Number(rangeEnd[1]) - 1
                        c.tmpEndDate = Number(rangeEnd[2])
                        c.customRange = false;
                    }else{
                        c.$emit('input', ['', ''])
                    }
                }
                if(!c.value){
                    c.$emit('input', '')
                }
            });
        },
        data () {
            let now = new Date();
            return {
                showCancel: false,
                panelState: false,
                panelType: 'date',
                bg: 'bg',
                coordinates: {},
                year: now.getFullYear(),
                month: now.getMonth(),
                date: now.getDate(),
                dateString: 'date',
                monthString: 'month',
                yearString: 'year',
                underLine: ' ~ ',
                tmpYear: now.getFullYear(),
                tmpMonth: now.getMonth(),
                tmpStartYear: now.getFullYear(),
                tmpStartMonth: now.getMonth(),
                tmpStartDate: now.getDate(),
                // tmpEndYear: now.getFullYear(),
                tmpEndMonth: now.getMonth(),
                tmpEndDate: now.getDate(),
                minYear: Number,
                minMonth: Number,
                minDate: Number,
                maxYear: Number,
                maxMonth: Number,
                maxDate: Number,
                yearList: Array.from({length: 12}, (value, index) => new Date().getFullYear() + index),
                monthList: [1, 2, 3 ,4 ,5, 6, 7 ,8, 9, 10, 11, 12],
                weekList: [0, 1, 2, 3, 4, 5, 6],
                rangeStart: false,
                customRange: false,
                inputWrapper: 'input-wrapper',
            }
        },
        props: {
            language: {default: 'en'},
            min: {default: '1970-01-01'},
            max: {default: '3016-01-01'},
            value: {
                type: [String, Array],
                default: ''
            },
            range: {
                type: Boolean,
                default: false
            },
            tmpEndYear: {},
        },
        methods: {
            togglePanel () {
                this.panelState = !this.panelState
                this.rangeStart = false
            },
            inputFromat: function(time){
                var StartTime = new Date(time);
                var month = StartTime.getMonth()+1;
                var date = StartTime.getDate();
                switch (this.language) {
                    case 'en':
                        return date + ' ' + {1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
                         7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'}[month]
                    case 'ch':
                        return date + ' ' + {1: '一月', 2: '二月', 3: '三月', 4: '四月', 5: '五月', 6: '六月',
                         7: '七月', 8: '八月', 9: '九月', 10: '十月', 11: '十一月', 12: '十二月'}[month]
                    case 'uk':
                        return date + ' ' + {1: 'Січень', 2: 'Лютий', 3: 'Березень', 4: 'Квітень', 5: 'Травень', 6: 'Червень',
                         7: 'Липень', 8: 'Серпень', 9: 'Вересень', 10: 'Жовтень', 11: 'Листопад', 12: 'Грудень'}[month]
                    default:
                        return month
                }
            },
            inputEnd: function(){

            },
            isSelected (type, item) {
                switch (type){
                    case 'year':
                        if(!this.range) return item === this.tmpYear
                        return (new Date(item, 0).getTime() >= new Date(this.tmpStartYear, 0).getTime() 
                            && new Date(item, 0).getTime() <= new Date(this.tmpEndYear, 0).getTime())
                    case 'month':
                        if(!this.range) return item === this.tmpMonth && this.year === this.tmpYear
                        return (new Date(this.tmpYear, item).getTime() >= new Date(this.tmpStartYear, this.tmpStartMonth).getTime() 
                            && new Date(this.tmpYear, item).getTime() <= new Date(this.tmpEndYear, this.tmpEndMonth).getTime())
                    case 'date':
                        if(!this.range) return this.date === item.value && this.month === this.tmpMonth && item.currentMonth
                        let month = this.tmpMonth
                        item.previousMonth && month--
                        item.nextMonth && month++
                        return (new Date(this.tmpYear, month, item.value).getTime() >= new Date(this.tmpStartYear, this.tmpStartMonth, this.tmpStartDate).getTime() 
                            && new Date(this.tmpYear, month, item.value).getTime() <= new Date(this.tmpEndYear, this.tmpEndMonth, this.tmpEndDate).getTime())
                }
            },
            chType (type) {
                this.panelType = type
            },
            chYearRange (next) {
                if(next){
                    this.yearList = this.yearList.map((i) => i + 12)
                }else{
                    this.yearList = this.yearList.map((i) => i - 12)
                }
            },
            prevMonthPreview () {
                this.tmpMonth = this.tmpMonth === 0 ? 0 : this.tmpMonth - 1
            },
            nextMonthPreview () {
                this.tmpMonth = this.tmpMonth === 11 ? 11 : this.tmpMonth + 1
            },
            selectYear (year) {
                if(this.validateYear(year)) return
                this.tmpYear = year
                this.panelType = 'month'
            },
            selectMonth (month) {
                if(this.validateMonth(month)) return
                this.tmpMonth = month
                this.panelType = 'date'
            },
            hover: function (item) {
            	if(this.rangeStart && item.currentMonth){
                	for (var i = 0; i < this.dateList.length; i++) {
                		if(this.tmpMonth === this.tmpEndMonth && this.tmpMonth === this.tmpStartMonth){
	                		if(this.dateList[i].value > this.tmpStartDate && this.dateList[i].value < item.value){
	                			this.dateList[i].rangeSelected = true;
	                			if(this.dateList[i].value === this.tmpStartDate+1){
	                				this.dateList[i].firstRangeSelected = true;
	                			}
	                			if(this.dateList[i].value === item.value-1){
	                				this.dateList[i].lastRangeSelected = true;
	                			}
	                		}else if(this.dateList[i].value < this.tmpStartDate && this.dateList[i].value > item.value){
	                			this.dateList[i].rangeSelected = true;
	                			if(this.dateList[i].value === this.tmpStartDate-1){
	                				this.dateList[i].lastRangeSelected = true;
	                			}
	                			if(this.dateList[i].value === item.value+1){
	                				this.dateList[i].firstRangeSelected = true;
	                			}
	                		}else{
	                			if(this.dateList[i].rangeSelected){
	                				// this.dateList[i].rangeSelected = false;
	                				delete this.dateList[i].rangeSelected;
	                				delete this.dateList[i].firstRangeSelected;
	                				delete this.dateList[i].lastRangeSelected;
	                			}
	                		}                			
                		}else if(this.tmpMonth > this.tmpEndMonth){
                			if(this.dateList[i].value < item.value){
	                			this.dateList[i].rangeSelected = true;
	                			if(this.dateList[i].value === this.tmpStartDate+1){
	                				this.dateList[i].firstRangeSelected = true;
	                			}
	                			if(this.dateList[i].value === item.value-1){
	                				this.dateList[i].lastRangeSelected = true;
	                			}
                			}else{
	                			if(this.dateList[i].rangeSelected){
	                				// this.dateList[i].rangeSelected = false;
	                				delete this.dateList[i].rangeSelected;
	                				delete this.dateList[i].firstRangeSelected;
	                				delete this.dateList[i].lastRangeSelected;
	                			}
	                		} 
                		}else if(this.tmpMonth < this.tmpStartMonth){
                			if(this.dateList[i].value > item.value){
	                			this.dateList[i].rangeSelected = true;
	                			if(this.dateList[i].value === this.tmpStartDate-1){
	                				this.dateList[i].lastRangeSelected = true;
	                			}
	                			if(this.dateList[i].value === item.value+1){
	                				this.dateList[i].firstRangeSelected = true;
	                			}
                			}else{
	                			if(this.dateList[i].rangeSelected){
	                				// this.dateList[i].rangeSelected = false;
	                				delete this.dateList[i].rangeSelected;
	                				delete this.dateList[i].firstRangeSelected;
	                				delete this.dateList[i].lastRangeSelected;
	                			}
	                		} 
                		}
                        let RangeStart = `${this.tmpStartYear}-${('0' + (this.tmpStartMonth + 1)).slice(-2)}-${('0' + this.tmpStartDate).slice(-2)}`
                        let RangeEnd = `${this.tmpEndYear}-${('0' + (this.tmpEndMonth + 1)).slice(-2)}-${('0' + this.tmpEndDate).slice(-2)}`
                        let value = [RangeStart, RangeEnd, true]
                        this.$emit('input', value)
                	}
            	}
            },
            leave: function(){
                	for (var i = 0; i < this.dateList.length; i++) {
                		delete this.dateList[i].rangeSelected;
        				delete this.dateList[i].firstRangeSelected;
        				delete this.dateList[i].lastRangeSelected;
                	}
                    let RangeStart = `${this.tmpStartYear}-${('0' + (this.tmpStartMonth + 1)).slice(-2)}-${('0' + this.tmpStartDate).slice(-2)}`
                    let RangeEnd = `${this.tmpEndYear}-${('0' + (this.tmpEndMonth + 1)).slice(-2)}-${('0' + this.tmpEndDate).slice(-2)}`
                    let value = [RangeStart, RangeEnd, true]
                    this.$emit('input', value)
            },
            selectDate (date) {
                setTimeout(() => {
                    if(this.validateDate(date)) return
                    if(this.rangeStart && date.currentMonth && date.value === this.tmpStartDate){
						return
                    }
                    if(date.currentMonth){
	                    if(date.previousMonth){
	                        if(this.tmpMonth === 0){
	                            this.year -= 1
	                            this.tmpYear -= 1
	                            this.month = this.tmpMonth = 11
	                        }else{
	                            this.month = this.tmpMonth - 1
	                            this.tmpMonth -= 1
	                        }
	                    }else if(date.nextMonth){
	                        if(this.tmpMonth === 11){
	                            this.year += 1
	                            this.tmpYear += 1
	                            this.month = this.tmpMonth = 0
	                        }else{
	                            this.month = this.tmpMonth + 1
	                            this.tmpMonth += 1
	                        }
	                    }
	                    if(!this.range){
	                        this.year = this.tmpYear
	                        this.month = this.tmpMonth
	                        this.date = date.value
	                        let value = `${this.tmpYear}-${('0' + (this.month + 1)).slice(-2)}-${('0' + this.date).slice(-2)}`
	                        this.$emit('input', value)
	                        this.panelState = false

	                    }else if(this.range && !this.rangeStart){

	                        this.tmpEndYear = this.tmpStartYear = this.tmpYear
	                        this.tmpEndMonth = this.tmpStartMonth = this.tmpMonth
	                        this.tmpEndDate = this.tmpStartDate = date.value

	                        this.rangeStart = true

	                    }else if(this.range && this.rangeStart){
	                        
	                        this.tmpEndYear = this.tmpYear
	                        this.tmpEndMonth = this.tmpMonth
	                        this.tmpEndDate = date.value

	                        let d1 = new Date(this.tmpStartYear, this.tmpStartMonth, this.tmpStartDate).getTime(),
	                            d2 = new Date(this.tmpEndYear, this.tmpEndMonth, this.tmpEndDate).getTime()
	                        if(d1 > d2){
	                            let tmpY, tmpM, tmpD
	                            tmpY = this.tmpEndYear 
	                            tmpM = this.tmpEndMonth
	                            tmpD = this.tmpEndDate

	                            this.tmpEndYear = this.tmpStartYear
	                            this.tmpEndMonth = this.tmpStartMonth
	                            this.tmpEndDate = this.tmpStartDate

	                            this.tmpStartYear = tmpY
	                            this.tmpStartMonth = tmpM
	                            this.tmpStartDate = tmpD
	                        }
	                        let RangeStart = `${this.tmpStartYear}-${('0' + (this.tmpStartMonth + 1)).slice(-2)}-${('0' + this.tmpStartDate).slice(-2)}`
	                        let RangeEnd = `${this.tmpEndYear}-${('0' + (this.tmpEndMonth + 1)).slice(-2)}-${('0' + this.tmpEndDate).slice(-2)}`

	                        let value = [RangeStart, RangeEnd]
	                        this.$emit('input', value)
	                        this.rangeStart = false
	                        this.panelState = false
	                    }
                        bus.$emit('customRange');
                        this.customRange = true;
                    }
                }, 0)
            },
            validateYear (year) {
                return (year > this.maxYear || year < this.minYear) ? true : false
            },
            validateMonth (month) {
                if(new Date(this.tmpYear, month).getTime() >= new Date(this.minYear, this.minMonth - 1).getTime()
                    && new Date(this.tmpYear, month).getTime() <= new Date(this.maxYear, this.maxMonth - 1).getTime()){
                    return false
                }
                return true
            },
            validateDate (date) {
                let mon = this.tmpMonth
                if(date.previousMonth){
                    mon -= 1
                }else if(date.nextMonth){
                    mon += 1
                }
                if(new Date(this.tmpYear, mon, date.value).getTime() >= new Date(this.minYear, this.minMonth - 1, this.minDate).getTime()
                    && new Date(this.tmpYear, mon, date.value).getTime() <= new Date(this.maxYear, this.maxMonth - 1, this.maxDate).getTime()){
                    return false
                }
                return true
            },
            close (e) {
                if(!this.$el.contains(e.target)){
                    this.panelState = false
                    this.rangeStart = false
                }
            },
            clear() {
                this.$emit('input', this.range ? ['', ''] : '')
            }
        },
        watch: {
            min (v) {
                let minArr = v.split('-')
                this.minYear = Number(minArr[0])
                this.minMonth = Number(minArr[1])
                this.minDate = Number(minArr[2])
            },
            max (v) {
                let maxArr = v.split('-')
                this.maxYear = Number(maxArr[0])
                this.maxMonth = Number(maxArr[1])
                this.maxDate = Number(maxArr[2])
            },
            range (newVal, oldVal) {
                if(newVal === oldVal) return
                if(newVal && Object.prototype.toString.call(this.value).slice(8, -1) === 'String'){
                    this.$emit('input', ['', ''])
                }
                if(!newVal && Object.prototype.toString.call(this.value).slice(8, -1) === 'Array'){
                    this.$emit('input', '')
                }
            }
        },
        computed: {
            dateList () {
                let currentMonthLength = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate()
                let dateList = Array.from({length: currentMonthLength}, (val, index) => {
                    return {
                        currentMonth: true,
                        value: index + 1,
                        month: this.tmpMonth,
                        year: this.tmpYear, 
                    }
                })
                let startDay = new Date(this.tmpYear, this.tmpMonth, 1).getDay()
                var row = 5;
                if(startDay > 4 && currentMonthLength > 30){
                	row = 6;
                }
                if(startDay > 5 && currentMonthLength > 29){
                	row = 6;
                }
                let previousMongthLength = new Date(this.tmpYear, this.tmpMonth, 0).getDate()

                for(let i = 0, len = startDay; i < len; i++){
                    dateList = [{previousMonth: true, value: previousMongthLength - i, month: this.tmpMonth-1, year: this.tmpYear}].concat(dateList)
                }
                for(let i = dateList.length, item = 1; i < 7*row; i++, item++){
                    dateList[dateList.length] = {nextMonth: true, value: item, month: this.tmpMonth+1, year: this.tmpYear}
                }
                return dateList
            }
        },
        filters: {
            week: (item, lang) => {
                switch (lang) {
                    case 'en':
                        return {0: 'Su', 1: 'Mo', 2: 'Tu', 3: 'We', 4: 'Th', 5: 'Fr', 6: 'Sa'}[item]
                    case 'ch':
                        return {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'}[item]
                    case 'uk':
                        return {0: 'Пн', 1: 'Вт', 2: 'Ср', 3: 'Чт', 4: 'Пт', 5: 'Сб', 6: 'Нд'}[item]
                    default:
                        return item
                }
            },
            month: (item, lang) => {
                switch (lang) {
                    case 'en':
                        return {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
                         7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'}[item]
                    case 'ch':
                        return {1: '一月', 2: '二月', 3: '三月', 4: '四月', 5: '五月', 6: '六月',
                         7: '七月', 8: '八月', 9: '九月', 10: '十月', 11: '十一月', 12: '十二月'}[item]
                    case 'uk':
                        return {1: 'Січень', 2: 'Лютий', 3: 'Березень', 4: 'Квітень', 5: 'Травень', 6: 'Червень',
                         7: 'Липень', 8: 'Серпень', 9: 'Вересень', 10: 'Жовтень', 11: 'Листопад', 12: 'Грудень'}[item]
                    default:
                        return item
                }
            }
        },
        mounted () {
            this.$nextTick(() => {
                if(this.$el.parentNode.offsetWidth + this.$el.parentNode.offsetLeft - this.$el.offsetLeft <= 300){
                    this.coordinates = {left: '50%', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
                }else{
                    this.coordinates = {left: '50%', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
                }
                let minArr = this.min.split('-')
                this.minYear = Number(minArr[0])
                this.minMonth = Number(minArr[1])
                this.minDate = Number(minArr[2])

                let maxArr = this.max.split('-')
                this.maxYear = Number(maxArr[0])
                this.maxMonth = Number(maxArr[1])
                this.maxDate = Number(maxArr[2])

                if(this.range){
                    if(Object.prototype.toString.call(this.value).slice(8, -1) !== 'Array'){
                        throw new Error('Binding value must be an array in range mode.')
                    }
                    if(this.value.length){
                        var rangeStart = this.value[0].split('-')
                        var rangeEnd = this.value[1].split('-')
                        this.tmpStartYear = Number(rangeStart[0])
                        this.tmpStartMonth = Number(rangeStart[1]) - 1
                        this.tmpStartDate = Number(rangeStart[2])

                        this.tmpEndYear = Number(rangeEnd[0])
                        this.tmpEndMonth = Number(rangeEnd[1]) - 1
                        this.tmpEndDate = Number(rangeEnd[2])
                    }else{
                        this.$emit('input', ['', ''])
                    }
                }
                if(!this.value){
                    this.$emit('input', '')
                }
                window.addEventListener('click', this.close)
            })
        },
        beforeDestroy () {
            window.removeEventListener('click', this.close)
        }
}