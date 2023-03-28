import multer from 'multer'
function uploadImage(){
    multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../imgs/users')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname)  
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

        if(extensaoImg){
            return cb(null, true);
        }

        return cb(null, false);
    }
})
}
export default uploadImage