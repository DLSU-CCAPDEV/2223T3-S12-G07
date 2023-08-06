const {v4: uuidv4} = require('uuid');


const generate={
    uniqueId: function(s){
        const id = uuidv4();
        return s + '_'+id;
    },
};
module.exports = generate;