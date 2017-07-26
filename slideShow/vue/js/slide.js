 new Vue({
     el: '.carousel',
     data: {
         mark: 0,
         timer: null,
         img: ['images/1.jpg',
             'images/2.jpg',
             'images/3.jpg',
             'images/4.jpg'
         ]
     },
     created() {
         this.play()
     },
     methods: {
         change(i) {
             this.mark = i
         },
         autoPlay() {
             this.mark++
                 if (this.mark === 4) {
                     this.mark = 0
                     return
                 }
         },
         play() {
             setInterval(this.autoPlay, 3000)
         }
     }
 })