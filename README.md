# Facebook
``` ts
import multer from "multer"
const storage = multer.diskStorage({
  destination:(req:Request,file:any,cb:any)=>{
    cb(null,"Images")
  },
  filename:
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
And then relax 👍
