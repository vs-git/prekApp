var ErrorOutputFactory = (function () {

    /** @private */
    var handlerClass;

    function ErrorOutput() {}
    ErrorOutput.prototype.fire = function () {
        console.log("You have to override this method");
    };
    ErrorOutput.prototype.hide = function () {
        console.log("You have to override this method");
    };

    function PopupOutput() {
        this.div = $('<div/>').css({padding: "20px", backgroundColor: "#ddeeff"});
    }
    PopupOutput.prototype = Object.create(ErrorOutput.prototype);
    PopupOutput.prototype.constructor = PopupOutput;
    PopupOutput.prototype.fire = function (error) {
        this.div.text(error).ShowBlackout().on('click', this.hide);
    };
    PopupOutput.prototype.hide = function (e) {
        $(e.target).HideBlackout();
    };

    function PageOutput() {}
    PageOutput.prototype = Object.create(ErrorOutput.prototype);
    PageOutput.prototype.constructor = PageOutput;
    PageOutput.prototype.fire = function (error) {
        $(RM.pageErrorSelector).text(error).show().on('click', this.hide);
    };
    PageOutput.prototype.hide = function () {
        $(RM.pageErrorSelector).text('').hide();
    };

    function ConsoleOutput() {}
    ConsoleOutput.prototype = Object.create(ErrorOutput.prototype);
    ConsoleOutput.prototype.constructor = ConsoleOutput;
    ConsoleOutput.prototype.fire = function (error) {
        console.log(error);
    };

    return {

        getHandler: function (options) {
            options = _.extend({
                type: 'popup'
            }, options);

            switch (options.type.toLowerCase()) {
                case "page":
                    handlerClass = PageOutput;
                    break;
                case "popup":
                    handlerClass = PopupOutput;
                    break;
                case "console":
                    handlerClass = ConsoleOutput;
                    break;
            }
            return new handlerClass(options);
        }
    }
})();
