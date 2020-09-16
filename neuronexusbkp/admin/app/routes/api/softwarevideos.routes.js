const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const SoftwarevideosController = require('webservice/softwarevideos.controller');





/**
 * @api {get} /softwarevideos/list?title=searchvalue Softwarevideos List
 * @apiVersion 1.0.0
 * @apiGroup Softwarevideos
 * @apiparam title   For search query
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "Test",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "type": "image",
            "media": "media_1600261015141_1598025405936_profileimage_1580380248488_0i1xbvjul86e_csyf.jpg.jpg",
            "slug": "test-78e29",
            "isDeleted": false,
            "status": "Active",
            "_id": "5f620b9718458d259c478e29",
            "createdAt": "2020-09-16T12:56:55.195Z",
            "updatedAt": "2020-09-16T12:56:55.775Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.softwarevideos.list", '/softwarevideos/list', async (req, res) => {
  try {
    const success = await SoftwarevideosController.getAllsoftwarevideos(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});





/**
 * @api {get} /softwarevideos/:slug Softwarevideos Detail
 * @apiVersion 1.0.0
 * @apiGroup Softwarevideos
 * @apiparam id   Softwarevideos Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title": "Test",
        "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "type": "image",
        "media": "media_1600261015141_1598025405936_profileimage_1580380248488_0i1xbvjul86e_csyf.jpg.jpg",
        "slug": "test-78e29",
        "isDeleted": false,
        "status": "Active",
        "_id": "5f620b9718458d259c478e29",
        "createdAt": "2020-09-16T12:56:55.195Z",
        "updatedAt": "2020-09-16T12:56:55.775Z",
        "__v": 0
    },
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.softwarevideos", '/softwarevideos/:slug', async (req, res) => {
  try {
    const success = await SoftwarevideosController.getDetailssoftwarevideos(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});




module.exports = router;