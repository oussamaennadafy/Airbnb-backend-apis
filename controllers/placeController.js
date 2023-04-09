const Place = require('./../models/placeModel')

const multer = require('multer')


const multerStorage = multer.diskStorage({
 destination: (req, file, cb) =>
 {
  cb(null, 'public/img/places')
 },
 filename: (req, file, cb) =>
 {
  const ext = file.mimetype.split('/').at(-1)
  cb(null, `place-${Date.now()}-${Math.random() * 1000}.${ext}`)
 }
})

const multerFilter = (req, file, cb) =>
{
 if (file.mimetype.startsWith('image')) {
  cb(null, true)
 } else {
  cb(new Error('file is not an image'), false)
 }
}

const upload = multer({
 storage: multerStorage,
 fileFilter: multerFilter
})

const uploadPlaceImages = upload.array('images', 10)

const getAllPlaces = async (req, res) =>
{
 try {
  const places = await Place.find().select('-description -ratingsCount -title -__v -host')
  res.status(200).json({
   status: "success",
   result: places.length,
   body: {
    places
   }
  })
 } catch (err) {
  res.status(404).json({
   status: "fail",
   reason: "something went wrong"
  })
 }
}

const getOnePlace = async (req, res) =>
{
 try {
  const place = await Place.findById(req.params.id)
  res.status(200).json({
   status: "success",
   result: place.length,
   body: {
    place
   }
  })
 } catch (err) {
  res.status(404).json({
   status: "fail",
   reason: "something went wrong"
  })
 }
}

const createPlace = async (req, res) =>
{
 try {
  const { title, location, host, price, description } = req.body
  const images = req.files?.map(image => `http://localhost:8000/img/places/${image.filename}`)
  if (!title || !location || !host || !price || !images) throw new Error('something went wrong !')
  const createdPlace = await Place.create({
   title,
   description,
   location,
   host,
   price,
   images
  })
  res.status(200).json({
   status: "success",
   body: {
    createdPlace
   }
  })
 } catch (err) {
  res.status(400).json({
   status: "fail",
   reason: "something went wrong"
  })
 }
}


module.exports = {
 getAllPlaces,
 getOnePlace,
 createPlace,
 uploadPlaceImages
}