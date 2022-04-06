import cloudinary
import cloudinary.uploader
import cloudinary.api
from sympy import true

#CLOUDINARY_URL= cloudinary
cloudinary.uploader.upload("dog.mp4",
  folder = "myfolder/mysubfolder/",
  public_id = "my_dog",
  overwrite = true,
  notification_url = "https://mysite.example.com/notify_endpoint",
  resource_type = "video")