var Interpreter = function () {

    var dict;

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

            rulesArray.push(db[i].replace(".",""));
            }
            else{
              if(this.isFact(db[i])){
                  factsArray.push(db[i].replace(".",""));
              }
              else{
                      throw Error;
              }
            }
        }
        dict = {
            facts: factsArray,
            rules: rulesArray
        };
    }

    this.checkFacts = function (query) {

        for (var i in dict.facts){
            if (dict.facts[i] == query){
                return true;
            }
        }
        return false;
    }

    this.ruleExists = function (rule) {
        var getRuleName = function (rule){
            return rule.substring(0,rule.indexOf("("));
        }
        var ruleName = getRuleName(rule);
        for(i in dict.rules){
            if(ruleName == getRuleName(dict.rules[i])){
                return true;
            }

        }
        return false;
    }

    this.checkRules = function (rule) {
        if(!this.ruleExists(rule)){
            return false;
        }

    }

    this.checkQuery = function (query) {
        if(!this.isQuery(query)){
            throw Error('Incomplete Query');
        }
        if(this.checkFacts(query)){
            return true;
        }
        if(this.checkRules(query)){
            return true;
        }
        return false;
    }

}

module.exports = Interpreter;
