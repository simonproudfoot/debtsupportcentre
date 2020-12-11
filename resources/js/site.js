import Vue from 'vue'
import Progress from 'vue-multiple-progress'
import floatinglabel from 'vue-simple-floating-labels'
Vue.component('vm-progress', Progress)
Vue.use(Progress)
import axios from 'axios'
import VueAxios from 'vue-axios'
import browserDetect from "vue-browser-detect-plugin";
Vue.use(browserDetect);
Vue.use(VueAxios, axios)
window.onload = function () {
    var app = new Vue({
        el: '#app',
        data() {
            return {
                showMenu: false,
                overlay: 'false',
                waiting: false,
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
                        answer: '',
                        icon: 'q1.png',
                    },
                    question_2: {
                        question: "Is debt causing you stress and anxiety or affecting your mental health?",
                        options: ['Yes', 'No'],
                        answer: '',
                        icon: 'q2.png',
                    },
                    question_3: {
                        question: "What is you current employment status?",
                        options: ['Employed', 'Self employed', 'Benefits only', 'Retired', 'Unemployed', 'Other'],
                        answer: '',
                        icon: 'q3.png',
                    },
                    question_4: {
                        question: "What is you residential status?",
                        options: ['Homeowner', 'Shared ownership', 'Private tenant', 'Council tenant', 'Living with parents', 'Other'],
                        answer: '',
                        icon: 'q4.png',
                    },
                    question_5: {
                        question: "What is you the total amount of debt you owe?",
                        options: ['Less than £5,000', '£5,000 - £10,000', '£10,000 - £20,000', 'More than £20,000'],
                        answer: '',
                        icon: 'q5.png',
                    },
                    question_6: {
                        question: "How many debts do you have?",
                        options: ['1-3', '4-5', '6-7', '8 or more'],
                        answer: '',
                        icon: 'q6.png',
                    },
                    question_7: {
                        question: "What would be your ideal monthly repayment be towards your debt?",
                        options: ['Up to £100', '£100 - £150', '£150 - £200', 'More than £200'],
                        answer: '',
                        icon: 'q7.png',
                    },
                    question_8: {
                        question: "userDetails",
                        fullName: '',
                        phone: '',
                        email: '',
                        confirmThirdparty: false,
                        confirmTerms: false,
                        userIP: ''
                    },
                    question_9: {
                        question: "submit",
                        commsEmail: true,
                        commsSMS: true
                    }
                },
            }
        },
        computed: {
            oldBrowser(){
                console.log(this.$browserDetect.meta.version +'-'+ this.$browserDetect.meta.name )
                if(this.$browserDetect.meta.name == 'Edge' && this.$browserDetect.meta.version <= 18 ){
                  return true
                }
            },
            stepsDisplay() {
                return parseInt(this.step) + 1
            },
            validateSubmit() {
                if (!this.emailInvalid && this.questions.question_8.email && !this.phoneValidate && this.questions.question_8.phone && this.questions.question_8.fullName && this.questions.question_8.confirmThirdparty && this.questions.question_8.confirmTerms) {
                    return true
                } else {
                    return false
                }
            },
            emailInvalid() {
                var val = this.questions.question_8.email
                var re = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                if (!re.test(val) && val.length) {
                    console.log('email invalid')
                    return true
                }
            },
            phoneValidate() {
                var val = this.questions.question_8.phone
                var re = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
                if (!re.test(val) && val.length) {
                    console.log('phone invalid')
                    return true
                }
            },
            stepsTotal() {
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
            // get user IP
            fetch('https://api.ipify.org?format=json')
                .then(x => x.json()).then(({ ip }) => {
                    this.questions.question_8.userIP = ip;
                });
            // Check for stored data
            if (window.location.search.substring(1) == 'apply') {
                this.overlay = true
            } else {
                if (localStorage.getItem('overlay')) this.overlay = localStorage.getItem('overlay');
            }
            if (localStorage.getItem('step')) this.step = localStorage.getItem('step');
            if (localStorage.getItem('questions')) {
                Object.assign(this.questions, JSON.parse(localStorage.getItem('questions')));
            }
        },
        methods: {
            async submitData() {
                var btn = this.$refs.submitButton
                const errorMsg = "Sending failed! Please check you connection and try again."
                btn.classList.add("onclic");
                try {
                    var postData = await this.axios.post('api/send-debt-help', this.questions)
                } catch (err) {
                    console.log(err)
                    alert(errorMsg)
                } finally {
                    alert('Response: '+postData.data.OurRef)
                    // if (postData.data == 200) {
                     btn.classList.remove("onclic");
                    //     this.resetFields()
                    //     alert('To success page!')
                    // } else {
                    //     alert(errorMsg)
                    // }

                }
            },
            resetFields() {
                this.questions.question_1.answer = ''
                this.questions.question_2.answer = ''
                this.questions.question_3.answer = ''
                this.questions.question_4.answer = ''
                this.questions.question_5.answer = ''
                this.questions.question_6.answer = ''
                this.questions.question_7.answer = ''
                this.questions.question_8.email = ''
                this.questions.question_8.fullName = ''
                this.questions.question_8.phone = ''
                this.questions.question_8.confirmThirdparty = ''
                this.questions.question_8.confirmTerms = ''
                this.overlay = 'false'
                this.step = 0
            },
            nextStep() {
                // come back to this
                // Form will pause until animation finished
                // this.waiting = true
                // setTimeout(() => {
                //     this.step++
                //     this.waiting = false
                // }, 1500);
                this.step++
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