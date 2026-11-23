const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:794,height:1123},deviceScaleFactor:2});await p.goto('http://localhost:5173/cv');await p.waitForTimeout(4000);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2000);
await p.emulateMedia({media:'print'});
await p.pdf({path:process.argv[2],format:'A4',printBackground:true,margin:{top:0,bottom:0,left:0,right:0},preferCSSPageSize:true});
await p.emulateMedia({media:'screen'});const s=p.locator('section');await s.nth(0).screenshot({path:process.argv[3]+'-1.png'});await s.nth(1).screenshot({path:process.argv[3]+'-2.png'});
const over=await p.evaluate(()=>[...document.querySelectorAll('section')].map(s=>[s.scrollHeight,s.clientHeight]));console.log('overflow',JSON.stringify(over));await b.close()})();
