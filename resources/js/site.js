import Vue from 'vue'
import Progress from 'vue-multiple-progress'
import floatinglabel from 'vue-simple-floating-labels'
import { VLazyImagePlugin } from "v-lazy-image";
import axios from 'axios'
import CookieLaw from 'vue-cookie-law'
import VueAxios from 'vue-axios'
import browserDetect from "vue-browser-detect-plugin";
import carousel from 'vue-owl-carousel'
Vue.component('vm-progress', Progress)
Vue.use(Progress)
Vue.use(VLazyImagePlugin);
Vue.use(browserDetect);
Vue.use(VueAxios, axios)
window.onload = function () {
    var app = new Vue({
        el: '#app',
        data() {
            return {
                submitError: false,
                showMenu: false,
                overlay: 'false',
                phoneModal: false,
                waiting: false,
                step: 0,
                ready: false,
                contactMessage: '',
                required: {
                    name: false,
                    phone: false,
                    email: false,
                },
                validationRules: {
                    required: (value) => !!value || "Required.",
                    counter: (value) => !!value.length < 11 || "Min 11 numbers",
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
                        userIP: '',
                        commsEmail: 'Yes',
                        commsSMS: 'Yes'
                    },
                },
            }
        },
        computed: {
            fName() {
                const urlParams = new URLSearchParams(window.location.search);
                const myParam = urlParams.get('name');
                return myParam
            },
            oldBrowser() {
                if (this.$browserDetect.meta.name == 'Edge' && this.$browserDetect.meta.version <= 18) {
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
                var re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                if (!re.test(val) && val.length) {
                    console.log('email invalid')
                    return true
                }
            },
            phoneValidate() {
                var val = this.questions.question_8.phone
                var re = new RegExp(/^((\(?0\d{4}\)?\s?\d{3}\s?\d{3})|(\(?0\d{3}\)?\s?\d{3}\s?\d{4})|(\(?0\d{2}\)?\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/im);
                if (!re.test(val) && val.length) {
                    console.log('phone invalid')
                    return true
                }
            },
            stepsTotal() {
                return Object.keys(this.questions).length
            },
            percentageDone() {
                return (100 * this.step) / Object.keys(this.questions).length
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
            const countUpObserver = new IntersectionObserver((entries, observer) => {
                for (const entry of entries) {
                    if (!entry.target.classList.contains('animateIn')) {
                        entry.target.classList.toggle('animateIn', entry.isIntersecting)
                        this.animateValue('whyA', 15, 100)
                        this.animateValue('whyB', 120, 10)
                        this.animateValue('whyC', 13500, 5, 'currency')
                    }
                }
            });
            for (const element of document.querySelectorAll('.countUp')) {
                countUpObserver.observe(element);
            }
            const urlParams = new URLSearchParams(window.location.search);
            const apply = urlParams.get('apply');
            // get user IP
            fetch('https://api.ipify.org?format=json')
                .then(x => x.json()).then(({ ip }) => {
                    this.questions.question_8.userIP = ip;
                });
            // Check for stored data
            if (apply) {
                this.overlay = 'true'
            } else {
                if (localStorage.getItem('overlay')) this.overlay = localStorage.getItem('overlay');
            }
            if (localStorage.getItem('step')) this.step = localStorage.getItem('step');
            if (localStorage.getItem('questions')) {
                Object.assign(this.questions, JSON.parse(localStorage.getItem('questions')));
            }
        },
        methods: {
            animateValue(id, max, speed, format) {
                var current = 0
                setInterval(() => {
                    if (current < max) {
                        if (max > 1000) {
                            current += 50
                        } else {
                            current++;
                        }
                        if (format == 'currency') {
                            document.getElementById(id).innerHTML = current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        } else {
                            document.getElementById(id).innerHTML = current
                        }
                    }
                }, speed);
            },
            fieldErrors() {
                if (!this.questions.question_8.fullName) {
                    this.$refs.fullName[0].classList.add('fieldError')
                    this.required.name = true
                }
                if (!this.questions.question_8.email || this.emailInvalid) {
                    this.$refs.email[0].classList.add('fieldError')
                    this.required.email = true
                }
                if (!this.questions.question_8.phone || this.phoneValidate) {
                    this.$refs.phone[0].classList.add('fieldError')
                    this.required.phone = true
                }
                if (!this.questions.question_8.confirmThirdparty) {
                    this.$refs.agree[0].classList.add('fieldError')
                }
                if (!this.questions.question_8.confirmTerms) {
                    this.$refs.privacy[0].classList.add('fieldError')
                }
                if (!this.questions.question_8.commsSMS) {
                    this.$refs.smsBtns.classList.add('fieldError')
                }
            },
            async submitData() {
                if (this.validateSubmit) {
                    var btn = this.$refs.submitButton
                    const errorMsg = "Sending failed! Please check you connection and try again."
                    btn.classList.add("onclic");
                    try {
                        var postData = await this.axios.post('api/send-debt-help', this.questions)
                    } catch (err) {
                        console.log(err)
                        alert(errorMsg)
                    } finally {
                        btn.classList.remove("onclic");
                        var fname = this.questions.question_8.fullName.split(' ').length > 1 ? this.questions.question_8.fullName.substr(0, this.questions.question_8.fullName.indexOf(" ")) : this.questions.question_8.fullName
                        if (this.questions.question_3.answer == 'Benefits only' || this.questions.question_3.answer == 'Retired' || this.questions.question_3.answer == 'Unemployed') {
                            this.resetFields()
                            window.location.href = "/good-luck?fname=" + fname
                        } else if (this.questions.question_5.answer == 'Less than £5,000') {
                            this.resetFields()
                            window.location.href = "/received?fname=" + fname
                        } else {
                            this.resetFields()
                            window.location.href = "/thank-you?fname=" + fname
                        }
                    }
                } else {
                    this.submitError = true
                    document.getElementById('submitError').scrollIntoView();
                    this.fieldErrors()
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
                this.questions.question_8.commsEmail = 'Yes'
                this.questions.question_8.commsSMS = 'Yes'
                this.overlay = 'false'
                this.step = 0
            },
            nextStep() {
                // come back to this when icons ready
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
            floatinglabel,
            cookielaw: CookieLaw,
            carousel,
        },
        watch: {

            emailInvalid(v){
                v ? this.required.email = true : false
            },
            
            contactMessage(val) {
                val ? this.$refs.messageLabel.classList.add('active-label') : this.$refs.messageLabel.classList.remove('active-label')
            },
            showMenu(val) {
                if (val) {
                    this.$refs.menuButton.classList.add('opened')
                } else {
                    this.$refs.menuButton.classList.remove('opened')
                }
            },
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
                    // REMOVE SUBMIT WARNINGS - ADDED IN fieldErrors method
                    this.$nextTick(() => {

                        if(val.question_8.fullName){
                            this.$refs.fullName[0].classList.remove('fieldError') 
                            this.required.name = false
                           
                        }

                        if(val.question_8.email){
                            this.$refs.email[0].classList.remove('fieldError') 
                            this.required.email = false
                        }


                        if(val.question_8.phone){
                            this.$refs.phone[0].classList.remove('fieldError') 
                            this.required.phone = false
                        }



                    
                        val.question_8.confirmThirdparty ? this.$refs.agree[0].classList.remove('fieldError') : null
                        val.question_8.confirmTerms ? this.$refs.privacy[0].classList.remove('fieldError') : null
                    });

                  
                }
            },
        }
    })
}
