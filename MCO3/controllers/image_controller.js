const gfs = require('../models/gfs.js');
const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const Img = {
    getByID:  async function (req, res) {
        try {
            const param = req.query.param;
        
            let file;

            file = await uploads.files.findOne({ _id: ObjectId(param) });    
            
            if (!file) {
              return res.status(404).send('File not found');
            }
        
            // Set appropriate headers for image response
            res.set('Content-Type', file.contentType);
            const readStream = gfs.createReadStream({ _id: file._id });
            readStream.pipe(res);
          } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Server Error');
          }
        },
  
  getByName: async function (req, res) {
    try {
        const filename = req.query.name;
        // Find the file by filename

        const file = await gfs.findOne({ filename:filename });
        if (!file) {
          return res.status(404).send('File not found');
        }
    
        // Now we have the ObjectId of the file
        const readStream = await gfs.createReadStream(file._id);
    
        // Set appropriate headers for image response
        res.set('Content-Type', file.contentType);
        readStream.pipe(res);
      } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server Error');
      }
    
  },
    getImage: async function(req,res){
      const name = req.query.name;
      const type = req.query.type;
      const user = await db.findOne(User,{userName: name});
      var file = "";
      if(user!=null){
        if(type =="cover"){
          if(user.coverPhoto !=null){
            file = user.coverPhoto;
          }
        }else if(type == "profile"){
          if(user.profilePhoto !=null){
            file = user.profilePhoto;
            
          }
        }else
        res.set('Content-Type', 'application/json');
        res.send({filename:file});
        
      }else
      res.send(null);
    },


};

module.exports=Img;