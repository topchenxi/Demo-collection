function Carousel($node) {
    this.$pic = $node.find('.pic');
    this.$picWidth = this.$pic.children().width();
    this.picLength = this.$pic.children().length;
    this.$btnPrev = $node.find('.btn-prev');
    this.$btnNext = $node.find('.btn-next');
    this.$pageIndex = $node.find('.pageIndex');
    this.mark = 0;
    this.lock = false;
    this.init().bind().autoPlay();
}


Carousel.prototype = {
    init: function() {
        var $picFirst = this.$pic.children().eq(0).clone(),
            $picLast = this.$pic.children().eq(this.picLength - 1).clone();

        this.$pic.prepend($picLast);
        this.$pic.append($picFirst);
        this.$pic.width(this.$picWidth * this.$pic.children().length);
        this.$pic.css({
            'left': -this.$picWidth
        });
        for (var i = 0; i < this.picLength; i++) {
            var $li = $('<li></li>');
            this.$pageIndex.append($li);
        }
        this.$pageIndex.children().eq(0).addClass('active');
        return this;
    },

    playNext: function() {
        var _this = this;
        if (this.lock) {
            return
        } else {
            this.lock = true;
            this.$pic.animate({
                'left': '-=' + this.$picWidth
            }, function() {
                _this.mark++;
                if (_this.mark === _this.picLength) {
                    _this.$pic.css('left', -_this.$picWidth);
                    _this.mark = 0;
                }
                _this.lock = false;
                _this.showBullet();
            })
        }
    },


    playPrev: function() {
        var _this = this
        if (this.lock) {
            return
        } else {
            this.lock = true;
            this.$pic.animate({
                'left': '+=' + this.$picWidth
            }, function() {
                _this.mark--;
                if (_this.mark < 0) {
                    _this.$pic.css('left', -(_this.picLength * _this.$picWidth))
                    _this.mark = _this.picLength - 1;
                }
                _this.lock = false;
                _this.showBullet();
            })
        }
    },

    showBullet: function() {
        this.$pageIndex.children().removeClass('active')
        this.$pageIndex.children().eq(this.mark).addClass('active')

    },

    bind: function() {
        var _this = this;

        this.$btnNext.on('click', function() {
            _this.playNext();
        })

        this.$btnPrev.on('click', function() {
            _this.playPrev();
        })

        this.$pageIndex.on('click', 'li', function() {
            _this.mark = _this.$pageIndex.children().index($(this));
            _this.showBullet();
            _this.$pic.animate({
                'left': -(_this.mark + 1) * _this.$picWidth
            })
        })

        return this;
    },

    autoPlay: function() {
        setInterval(() => {
            this.playNext();
        }, 3000);
    }
}

new Carousel($('.window'));