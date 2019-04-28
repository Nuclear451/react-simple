var myObj = {
    specialFunction: function () {

    },

    anotherSpecialFunction: function () {

    },

    getAsyncData: function (cb) {
        cb();
    },

    render : function () {
        let that = this;
        this.getAsyncData(function () {
            that.specialFunction();
            that.anotherSpecialFunction();
        })
    }
}