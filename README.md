# Facebook
``` ts
import multer from "multer"
const storage = multer.diskStorage({
  destination:(req:Request,file:any,cb:any)=>{
    cb(null,"Images")
  },
  filename:(req:Request,file:any,cb)=>{
      let {name} = req.body
  console.log(file)
  cb(null,name+"_profileImage")
  }
})
```
Then 
``` ts
const upload = multer({storage})
server.post('/profile/image',upload.single('image'),(req:Request,res:Response)=>{

  body of post method 

})
```
First you nedd to run server of Backend
### Terminal
``` shell
npm i
```

``` shell
cd Server/
```
``` shell
npm run dev
```
# And then you need to path here:
``` shel
cd clent/
```
``` shell
npm run dev
```
```shell
And after more days you can to POST and LOGIN and others
And you can to   POST  a new VIDIO and a new POST
```
And then relax 👍
