import Vue from 'vue'
import Progress from 'vue-multiple-progress'
import floatinglabel from 'vue-simple-floating-labels'

Vue.component('vm-progress', Progress)
Vue.use(Progress)

window.onload = function () {
    var app = new Vue({
        el: '#app',
        data() {
            return {
                overlay: 'false',
                step: 0,
                ready: false,
                validationRules: {
                    required: (value) => !!value || "Required.",
                    counter: (value) => !!value.length <= 11 || "Min 11 numbers",
                    email: [
                        (v) => !!v || "E-mail is required",
                        (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "E-mail must be valid",
                    ],
                    telephoneRules: [
                        (v) => v != null && !!v || "Required",
                        (v) => v.match(/^[0-9]+$/) || "Not a valid number",
                        (v) => v != null && v.length > 10 || "Not a valid number",
                    ],
                },
                questions: {
                    question_1: {
                        question: "What describes your current situation?",
                        options: ['I am coping well', 'I struggle to keep up with payments', 'I urgently require help', 'I have defaults and CCJ recorded against me'],
                        answer: ''
                    },
                    question_2: {
                        question: "Is debt causing you stress and anxiety or affecting your mental health?",
                        options: ['Yes', 'No'],
                        answer: ''
                    },
                    question_3: {
                        question: "What is you current employment status?",
                        options: ['Employed', 'Self employed', 'Benefits only', 'Retired', 'Unemployed', 'Other'],
                        answer: ''
                    },
                    question_4: {
                        question: "What is you residential status?",
                        options: ['Homeowner', 'Shared ownership', 'Private tenant', 'Council tenant', 'Living with parents', 'Other'],
                        answer: ''
                    },
                    question_5: {
                        question: "What is you the total amount of debt you owe?",
                        options: ['Less than £5,000', '£5,000 - £10,000', '£10,000 - £20,000', 'More than £20,000'],
                        answer: ''
                    },
                    question_6: {
                        question: "How many debts do you have?",
                        options: ['1-3','4-5', '6-7', '8 or more'],
                        answer: ''
                    },
                    question_7: {
                        question: "What would be your ideal monthly repayment be towards your debt?",
                        options: ['Up to £100', '£100 - £150', '£150 - £200', 'More than £200'],
                        answer: ''
                    },
                    question_8: {
                        question: "userDetails",
                        fullName: '',
                        phone: '',
                        email: ''
                    }
                },
                userDetails: {
                    fullName: '',
                    phone: '',
                    email: ''
                }
            }
        },
        computed: {
            stepsTotal(){
                return Object.keys(this.questions).length
            },
            percentageDone() {
                return (100 * this.step) / this.stepsTotal
            },
            q1Image() {
                if (this.questions.question_2.answer == 'No') {
                    return 'q2_no.gif'
                } else if (this.questions.question_2.answer == 'Yes') {
                    return 'q2_yes.gif'
                } else {
                    return 'q2_start.png'
                }
            }
        },
        mounted() {
            // Check for stored data
            if (localStorage.getItem('overlay')) this.overlay = localStorage.getItem('overlay');
            if (localStorage.getItem('step')) this.step = localStorage.getItem('step');
            if (localStorage.getItem('questions')) {
                Object.assign(this.questions, JSON.parse(localStorage.getItem('questions')));
            }
        },
        methods: {
            emailValidate() {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.questions.aboutYou.email) || false
            },
            qCount() {
                var k = 0
                return k + 1;
            },
        },
        components: {
            floatinglabel
        },
        watch: {
            // Set cookies
            overlay(val) {
                localStorage.setItem('overlay', val);
            },
            step(val) {
                localStorage.setItem('step', val);
            },
            questions: {
                deep: true,
                handler(val) {
                    localStorage.setItem('questions', JSON.stringify(val));
                }
            },
        }
    })
}