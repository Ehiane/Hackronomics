import express, {Request, Response} from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* /parse: takes a json file, converts it to text for AI/ML handling */
router.post("/parse-json", upload.single("inputFile"), (request: Request, response: Response): void => {
    try {
        /* null file check */
        if (!request.file) {
            response.status(400).json({error: "no file uploaded"});
            return;
        }
        
        /* parse the json file */
        const jsonData = JSON.parse(request.file.buffer.toString("utf-8"));
        console.log("parsed data:", jsonData);
        response.json({message: "file has been parsed.", data: jsonData});
    } catch (error) {
        /* error handling */
        console.error("error (/upload-json):", error);
        response.status(500).json({error: "file could not be parsed" });
    }
});

export default router;
