import cheerio from 'cheerio';
import rp from 'request-promise';
import express from 'express';
import cors from 'cors'
const links = {
    "iPhone":[
        "https://www.cdrokc.com/iphone-8%ef%bf%bc/",
        "https://www.cdrokc.com/iphone-8/",
        "https://www.cdrokc.com/iphone-se2/",
        "https://www.cdrokc.com/iphone-x/",
        "https://www.cdrokc.com/iphone-xr/",
        "https://www.cdrokc.com/iphone-xs/",
        "https://www.cdrokc.com/iphone-xs-max/",
        "https://www.cdrokc.com/iphone-11/",
        "https://www.cdrokc.com/iphone-11-pro/",
        "https://www.cdrokc.com/iphone-11-pro-max/",
        "https://www.cdrokc.com/iphone-12-mini/",
        "https://www.cdrokc.com/iphone-12/",
        "https://www.cdrokc.com/iphone-12-pro/",
        "https://www.cdrokc.com/iphone-12-pro-max/",
        "https://www.cdrokc.com/iphone-13/",
        "https://www.cdrokc.com/iphone-13-mini/",
        "https://www.cdrokc.com/iphone-13-pro/",
        "https://www.cdrokc.com/iphone-13-pro-max%ef%bf%bc/"
    ],
    "Samsung":[
        "https://www.cdrokc.com/galaxy-s22-ultra-2/",
        "https://www.cdrokc.com/galaxy-s22-3/",
        "https://www.cdrokc.com/galaxy-s22-2/",
        "https://www.cdrokc.com/galaxy-s21-ultra%ef%bf%bc/",
        "https://www.cdrokc.com/galaxy-s21%ef%bf%bc/",
        "https://www.cdrokc.com/galaxy-s21%ef%bf%bc-2/",
        "https://www.cdrokc.com/galaxy-s20-ultra%ef%bf%bc/",
        "https://www.cdrokc.com/galaxy-s20%ef%bf%bc/",
        "https://www.cdrokc.com/galaxy-s20%ef%bf%bc-2/",
        "https://www.cdrokc.com/galaxy-s10/",
        "https://www.cdrokc.com/galaxy-s10%ef%bf%bc/",
        "https://www.cdrokc.com/galaxy-s10e%ef%bf%bc/",
        "https://www.cdrokc.com/galaxy-note-20-ultra%ef%bf%bc/",
        "https://www.cdrokc.com/galaxy-note-20%ef%bf%bc/",
        "https://www.cdrokc.com/galaxy-s10%ef%bf%bc/",
        "https://www.cdrokc.com/galaxy-note-10%ef%bf%bc-2/",
        "https://www.cdrokc.com/galaxy-note-9/",
        "https://www.cdrokc.com/galaxy-buds-pro/",
        "https://www.cdrokc.com/galaxy-buds/"
    ]
}
const priceList ={
    "iPhone":[],
    "Samsung":[]
}

const app = express();
app.use(cors())
app.set('view engine','ejs')
let iPhonePrices= new Promise((res,rej)=>{
    links.iPhone.forEach((link,i,a)=>{
        rp(link)
            .then(d=>{
                let $ = cheerio.load(d)
                let title = $('meta[property="og:title"]').attr('content').replace(" - CDROKC","")
                let x = $('div.elementor-widget-container').eq(10)
                let output = [title]
                x.children().each(child=>{
                    let xArr = x.children().eq(child).text()
                    output.push(xArr)
                    })
                priceList.iPhone.push(output)
                if(i===a.length-1) res()
            })
            .catch(e=>console.log(e))
    })
})
let samsungPrices= new Promise((res,rej)=>{
    links.Samsung.forEach((link,i,a)=>{
        rp(link)
            .then(d=>{
                let $ = cheerio.load(d)
                let title = $('meta[property="og:title"]').attr('content').replace(" - CDROKC","")
                let x = $('div.elementor-widget-container').eq(10)
                let output = [title]
                x.children().each(child=>{
                    let xArr = x.children().eq(child).text()
                    output.push(xArr)
                    })
                priceList.Samsung.push(output)
                if(i===a.length-1) res()
            })
            .catch(e=>console.log(e))
    })
})

app.get('/',(req,res)=>{
    iPhonePrices    
    .then(()=>{
        samsungPrices
            .then(()=>{
                priceList.iPhone.sort()
                priceList.Samsung.sort()
                res.render('list',{priceList})
            })
    })
})
app.listen(process.env.PORT||3000,()=>console.log('server started...'))

 export default app;
