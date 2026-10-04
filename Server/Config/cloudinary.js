import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Remove an image we no longer use. Takes the stored URL, e.g.
// https://res.cloudinary.com/<cloud>/image/upload/v123/school-website/abc.jpg
// and deletes public id "school-website/abc". Non-Cloudinary URLs are ignored.
export const deleteImage = async (url) => {
  if (!url?.includes("res.cloudinary.com")) return;

  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z0-9]+$/i);
  if (!match) return;

  try {
    await cloudinary.uploader.destroy(match[1]);
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
  }
};

export default cloudinary;
