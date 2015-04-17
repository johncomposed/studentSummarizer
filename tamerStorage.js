wcTamer.service('tamerStorage', function ($q) {
    var storage = chrome.storage.local;
    var _this = this;
    this.data = [];

    this.findAll = function(callback) {
        storage.get('codeData', function(keys) {
            if (keys['codeData'] !== null) {
                _this.data = keys['codeData'];
                //console.log(_this.data);
                callback(_this.data);
            }
        });
    }

    this.sync = function() {
        storage.set({'codeData': this.data}, function() {
            console.log('Data is stored in Chrome storage');
        });
    }

    this.remove = function(hw) {
        this.data.splice(this.data.indexOf(hw), 1);
        this.sync();
    }

    this.removeAll = function() {
        this.data = [];
        this.sync();
    }

});
