const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
//const { body } = require('express-validator');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const obrasController = require ('../controllers/obrasController');

//middleware que se usa en la ruta POST de register
/*const validations = [
    body('Nombre').notEmpty().withMessage('Tienes que ingresar tu nombre'),
    body('Email').notEmpty().withMessage('Tienes que ingresar tu email'),
    
    body('Imagen').custom((value, { req }) => {
        let file = req.file;
        if(!file) {
           throw new Error('Tienes que subir una imagen');}
           return true;
    }),
    ]*/

let obrasmulterDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => 
{let obraimgfolder = path.join(__dirname, '../../public/img');
 cb(null, obraimgfolder)
},
    filename: (req, file, cb) => {
let obraimg = Date.now() + file.originalname;
cb(null, obraimg);   
   },
});


let obraimgUpload = multer({ storage : obrasmulterDiskStorage });

cloudinary.config({ 
    cloud_name: 'dpnrapsvi', 
    api_key: '874593837933416', 
    api_secret: 'c_a2SUynA5J4O6y5yFCbL6HzADA' 
  });
  
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Artistas',
      allowed_formats: ['jpg', 'png'], 
      transformation: [{ width: 500, height: 500, crop: 'limit' }], 
    },
  });

  const upload = multer({ storage: storage });


  router.get('/obras', obrasController.obras );

  router.get('/obraCreacion',obrasController.formCreate)


  router.post('/obraCreacion',upload.array('Imagen') , obrasController.create)

module.exports = router;