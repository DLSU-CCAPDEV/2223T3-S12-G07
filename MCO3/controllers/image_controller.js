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
        console.log(gfs.grid);
        // Find the file by filename
        console.log("filename"+req.session.user.prof_pic);
        console.log("asdf"+ filename);

        const file = await gfs.findOne({ filename:req.session.user.prof_pic });
        console.log("file" + file);
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
      const user = await db.findOne(User,{userName: name});
      if(user!=null){
        if(user.profilePhoto !=null){
          console.log(user.profilePhoto);
          res.set('Content-Type', 'application/json');
          res.send({filename:user.profilePhoto});
        }else
          res.send(null);
      }
    },


};

module.exports=Img;