import multer from "multer";


export const multerMiddle=({Extensions})=>{
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'uploads')
        },
        filename:(req,file,cb)=>{
            cb(null,file.originalname)
    
        }
    })

    const fileFilter=(req,file,cb)=>{

        if(Extensions.includes(file.mimetype.split('/')[1])){
            return cb(null,true)
        }
        cb(new Error('Extensions Not Allowed',false))

    }

    const file=multer({fileFilter,storage})

    return file
}
export const multerMiddleHost=({Extensions})=>{
    const storage=multer.diskStorage({
    })

    const fileFilter=(req,file,cb)=>{

        if(Extensions.includes(file.mimetype.split('/')[1])){
            return cb(null,true)
        }
        cb(new Error('Extensions Not Allowed',false))

    }

    const file=multer({fileFilter,storage})

    return file
}