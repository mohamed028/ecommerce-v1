import brand from '../../../db/models/brand.model.js'
import slugify from 'slugify'
import cloudinary_connection from '../../utils/cloudinary.js'
import Category from '../../../db/models/category.model.js'
import SubCategory from '../../../db/models/sub-category.model.js'
import { nanoid } from 'nanoid'
export const add_brand=async(req,res,next)=>{
    const{name}=req.body
    const {_id}=req.auth
    const {categoryId,subcategoryId}=req.query

    const subCategory=await SubCategory.findById(subcategoryId).populate('categoryId','folderId')
    if(!subCategory){
        return next({message:"subCategory Not found",cause:400})
    }


    const isbrandExist=await brand.findOne({name,subcategoryId})
    if(isbrandExist){
        return next({cause:400,message:"name Is Alredy Exist"})
    }
    if(categoryId!=subCategory.categoryId._id){
        return next({message:"category Not Found",cause:400})
    }
    
    const slug=slugify(name,'-')
    if(!req.file){
        return next({cause:400,Msg:"Image Is Required"})
    }
    const folderId=nanoid(5)
   const {secure_url,public_id}=await cloudinary_connection().uploader.upload(req.file.path,{
folder:`${process.env.FOLDER}/categories/${subCategory.categoryId.folderId}/subcategory/${subCategory.folderId}/brands/${folderId}`
})

const addBrand=await brand.create({
    name,
    slug,
    Image:{secure_url,public_id},
    folderId,
    addedBy:_id,
    subcategoryId,
    categoryId
})

if(!addBrand){
    return next({message:"brand Added Field",cause:400})
}

res.status(201).json({
    Msg:"Done",
    addBrand
})
}
