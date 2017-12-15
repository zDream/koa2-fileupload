const router = require('koa-router')()
const multer = require('koa-multer')
const customStroage = require('../util/myCustomStorage')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/upload',async (ctx, next) => {
  await ctx.render('upload')
})
router.post('/fileUpload',async(ctx,next) => {
    await next()
    let uploadDir = 'assets/uploads/'

    let mystorage = customStroage({
        // 文件保存路径 文件重命名
        destination: (req, file, cb) => {
            let originalnameArr = req.body.file_name.split('.')
            let postfix = originalnameArr[originalnameArr.length - 1]
            let timeNow = Date.now()
            // cb(null, uploadDir + timeNow + '.' + postfix)
            // cb(null, uploadDir + req.body.flag+file.originalname)
            cb(null, uploadDir + req.body.file_name)
        }
    })
    // 上传实例
    let upload = multer({
        storage: mystorage
        // dest: 'assets/uploads/'
    })

    // 执行单文件上传
    let handle = await upload.single('file')
    let response = await handle(ctx)
    // console.log('upload res', response)
    // console.log('req.file = ',response.req.file);
    // console.log('req.body = ',response.req.body)
    let res
    if (response) {
        res = {
            status: 200,
            msg: '上传成功！',
            data: {
                file: response.req.file,
                filename: response.req.file.filename,
                url: '//' + response.request.header.host + '/' + uploadDir + response.req.file.filename
            }
        }
    } else {
        res = {
            status: 5000,
            msg: '上传失败！',
            data: response
        }
    }
    ctx.body = res || {}
})
module.exports = router
