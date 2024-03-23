import slugify from "slugify"
import Category from "../../../db/models/category.model.js"
import cloudinary_connection from "../../utils/cloudinary.js"
import { nanoid } from "nanoid"
const generate=nanoid(5)
const folderId=generate
export const add_category=async(req,res,next)=>{
 const {name}=req.body
 const {_id}=req.auth

const NameExist=await Category.findOne({name})
if(NameExist){return next (new Error('name Is Already Exist',{cause:401}))}

const {public_id,secure_url} = await cloudinary_connection().uploader.upload(req.file.path,{
    folder:`${process.env.FOLDER}/categories/${folderId}`
})

const slug=slugify(name,'-');

const AddCategory=await Category.create({
name,
Image:{secure_url,public_id},
slug,
addedBy:_id,
folderId
})

if(!AddCategory){return next(new Error("Added Category Filed",{cause:400}))}

res.status(201).json({
    mag:"Done",
    AddCategory
})
}

export const update_category=async(req,res,next)=>{
    const {name,oldpublicId}=req.body
    const {categoryid}=req.params
    const {_id}=req.auth

    const category=await Category.findById({categoryid});

    if(!category){return next({cause:400,message:"category not Found"})}

    if(name){
        const nameDublcate=await Category.findOne({name})
        if(nameDublcate){
            return next(new Error('The Name Is Alredy Exist',{cause:400}))
        }

        const slug=slugify(name,'-')

        const UpdateCategory=await Category.findByIdAndUpdate({categoryid},{name,slug,updatedBy:_id})

        if(!UpdateCategory){return next({cause:400,message:"Updated Category Filed"})}
    }

    if(oldpublicId){
        if(!req.file){return next({cause:400,message:"Image Is requierd"})}

        const {secure_url,public_id}=await cloudinary_connection().uploader.upload(req.file.path,{
            folder:`${process.env.FOLDER}/categoris/${category.folderId}`,
            public_id:oldpublicId
        })
        category.Image.secure_url=secure_url
        category.save()
    }
res.json({
    category
})
    
}

