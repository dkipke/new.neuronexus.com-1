const imageCarouselRepo = require('image_carousel/repositories/imagecarousel.repository');

/*
// @Method: getSettingBySlug
// @Description: Get Setting data By Slug
*/
exports.getAllValidData = async req => {
    try {
        const resultData = await imageCarouselRepo.getAllByField({status: 'Active', isDeleted: false });
        if(resultData){
            return { status: 200, data: resultData, message: 'Result Data fetched Successfully' };
        } else{
            return { status: 201, data: [], message: 'No Data Found' };
        }
    } catch (error) {
        return { "status": 500, data:{}, "message": error.message }
    }
};