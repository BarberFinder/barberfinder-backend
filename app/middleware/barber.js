import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: './app/public/images/',
	filename: (req, file, cb) => {
		console.log(file);
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	}
}).single('profile_image');

const checkFileType = (file, cb) => {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
};

export default upload;
