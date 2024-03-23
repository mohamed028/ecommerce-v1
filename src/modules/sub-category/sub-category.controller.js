import slugify from 'slugify'
import { nanoid } from 'nanoid'
import Category from '../../../db/models/category.model.js'
import subCategory from '../../../db/models/sub-category.model.js'
import cloudinary_connection from '../../utils/cloudinary.js'
const generate=nanoid(5)
const folderId=generate
export const add_subCategory=async(req,res,next)=>{
    const {name}=req.body
    const {categoryId}=req.params
    const {_id}=req.auth
    console.log(categoryId)
 
    const isnameDublicate=await subCategory.findOne({name});

    if(isnameDublicate){
        return next({cause:400,msg:"name Is Alredy Exist"})
    }

    const category=await Category.findById(categoryId);
    if(!category){return next ({cause:400,Msg:"Category Not Found"})}

    if(!req.file){return next({cause:400,Msg:"Image Is Required"})}

    const {secure_url,public_id}=await cloudinary_connection().uploader.upload(req.file.path,{
    folder:`${process.env.FOLDER}/categories/${category.folderId}/subcategory/${folderId}`
    })
    const slug=slugify(name,'-');


    const addSubCategory=await subCategory.create({
        name,
        slug,
        Image:{secure_url,public_id},
        categoryId,
        addedBy:_id,
        folderId
    })

    if(!addSubCategory){return next({cause:404,Msg:"Added Filed"})}

    res.status(201).json({
        msg:"Done",
        addSubCategory
    })



}