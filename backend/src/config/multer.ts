import multer from "multer";

export default {
  upload() {
    return {
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
      }
    };
  },
};
