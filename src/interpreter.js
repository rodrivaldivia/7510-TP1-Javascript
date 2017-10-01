var Interpreter = function () {

    this.isRule = function (string){
        var ruleReg = /\w+\(\w+(,\ \w+)*\)\ \:\-\ (\w+\(\w+(,\ \w+)*\),\ )*./;
        return ruleReg.test(string);
    }

    this.isFact = function (string){
        if(this.isRule(string)){
            return false;
        }
        var factReg = /\w+\(\w+(, \w+)*\)./;
        return factReg.test(string);
    }

    this.isQuery = function (string){
        if(this.isRule(string)){
            return false;
        }
        var factReg = /\w+\(\w+(, \w+)*\)/;
        return factReg.test(string);
    }

    this.parseDB = function (db) {
        var factsArray = [];
        var rulesArray = [];
        for (var i in db){
            console.log(db[i])
            if(this.isRule(db[i])){
            rulesArray.push(db[i]);
            }
            else{
              if(this.isFact(db[i])){
                  factsArray.push(db[i]);
              }
              else{
                      throw new Error();
              }
            }
        }
        var dict = {
            facts: factsArray,
            rules: rulesArray
        };
    }

    this.checkQuery = function (query) {
        if(!this.isQuery(query)){
            throw new Error();
        }

        return true;
    }

}

module.exports = Interpreter;
