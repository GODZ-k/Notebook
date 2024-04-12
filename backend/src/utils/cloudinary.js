import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});
const uploadOnCloudinary = async(LocalFilePath) => {

    try {

        if (!LocalFilePath) return null

        console.log(LocalFilePath)

        // upload the file on the cloudinary server
        const response = await cloudinary.uploader.upload(LocalFilePath, {
            resource_type: "auto"
        })

        // file has been uploaded successfully
        console.log("file uploaded successfully", response)

        fs.unlinkSync(LocalFilePath) // remove file

        return response

    } catch (error) {

        // unlink file when uploading fail
        fs.unlinkSync(LocalFilePath) // remove the locally saved file as the upload operaton got failed

        console.log("upload failed", error)

        return null
    }

}


export { uploadOnCloudinary }