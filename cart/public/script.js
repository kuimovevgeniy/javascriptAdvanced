const app = new Vue({

el: '#app',
data: {
    name: 'Dmitry',
    items: [
        { title: 'AAA', weight: 10 },
        { title: 'BBB', weight: 20 },
    ],
},
methods: {
    handleClick() {
        this.items[2].title = 'hfhfhflsls';
    }
},
mounted() {
    console.log('Mounted');
},
computed: {
    
}

});