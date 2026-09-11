(()=>{
const host=document.getElementById('demo-quantum-optics');
const root=host.attachShadow({mode:'open'});
root.append(document.getElementById('template-quantum-optics').content.cloneNode(true));
const owner=host.ownerDocument;
const scopedDocument={
 getElementById:id=>root.getElementById(id),
 querySelector:selector=>root.querySelector(selector),
 querySelectorAll:selector=>root.querySelectorAll(selector),
 get activeElement(){return root.activeElement||host},
 get fullscreenElement(){return owner.fullscreenElement},
 documentElement:host,
 exitFullscreen:()=>owner.exitFullscreen(),
 addEventListener:(type,listener)=>{(type==='keydown'?root:owner).addEventListener(type,listener)}
};
(function(document){'use strict';
const $=id=>document.getElementById(id),canvas=$('scene'),ctx=canvas.getContext('2d');
let running=!matchMedia('(prefers-reduced-motion: reduce)').matches,clock=0,last=0,aligned=0,autoAlign=false,alignClock=0,hitboxes=[];
const blue='#51d6ee',orange='#ffb576',violet='#a49aff';
const descriptions={laser:['Tunable laser','The laser supplies the incident field. This demonstration adjusts relative intensity without specifying wavelength, atom species or absolute power. Real optical trapping also depends on detuning, polarization, beam quality and atomic polarizability.'],mirror:['Mirror','Redirects the beam into subsequent optics. Real alignment involves position, angle and beam mode.'],slm:['Spatial light modulator (SLM)','Shapes the spatial phase to form multiple focused spots through the optical system. This conceptual layout does not calculate a holographic phase pattern.'],objective:['High-NA objective','Focuses the shaped field onto the atom plane to create optical trapping potentials. Tweezers trap existing atoms; they do not create atoms.'],array:['Atomic tweezer array','Each spot represents a potential atom-trapping site. Only the target light field is shown; atom loading, temperature, occupancy and quantum gates are not simulated.'],combiner:['Beam combiner','Combines two paths into shared focusing optics. Real components depend on wavelength, polarization and coating.']};
function text(id,t){$(id).textContent=t}function html(id,t){$(id).innerHTML=t}
function power(){return Number($('power').value)/100}
function update(){
text('powerValue',$('power').value);text('angleValue',Number($('angle').value).toFixed(1));
text('quality',Math.round(aligned/6*100)+'%');$('qualityBar').style.width=aligned/6*100+'%';
text('qualityText',aligned===6?'Both paths aligned. Array formed.':'Select B1–B3, then G1–G3 to align');
text('play',running?'Ⅱ Pause':'▶ Start');text('runStatus',running?'Running':'Paused');
text('align',autoAlign?'Auto-aligning…':aligned===6?'✓ Aligned':'Auto-align '+aligned+' / 6');
html('metric1',Math.min(aligned,3)+' <small>/ 3</small>');html('metric2',Math.max(0,aligned-3)+' <small>/ 3</small>');
html('metric3',aligned+' <small>/ 6</small>');html('metric4',aligned===6&&power()>0?'25 <small>traps</small>':'0 <small>traps</small>');
}
function reset(){aligned=0;autoAlign=false;alignClock=0;$('angle').value=0;$('power').value=60;text('title','Arrange the microscopic world with light.');text('controlTitle','SLM dual-path tweezer array');text('intro','Align six mirrors to guide both beams into the objective and form the trap array.');text('powerLabel','Relative intensity');text('angleLabel','Array rotation');text('qualityLabel','Optical alignment');text('labName','SLM tweezer array experiment');text('metric1Label','Blue path alignment');html('metric1','0 <small>/ 3</small>');text('metric2Label','Green path alignment');html('metric2','0 <small>/ 3</small>');text('metric3Label','Mirror alignment');text('metric4Label','Target array');text('explainTitle','Optical tweezers trap atoms, not create them.');text('explainText','An SLM shapes the field and an objective focuses it into traps that hold existing atoms through optical dipole forces. Initialization, coherent control and readout are additional steps in quantum information experiments.');text('formulaLabel','OPTICAL DIPOLE POTENTIAL · Optical dipole potential');text('formula','U(r) ∝ −α(ω) I(r)');text('formulaNote','α is the dynamic polarizability. For positive α, atoms are attracted to intensity maxima.');$('source').href='https://arxiv.org/abs/physics/9902072';html('hint','Select each highlighted mirror or use auto-alignment.');document.querySelector('.legend').innerHTML='<span><i style="background:#51d6ee"></i>Blue path</span><span><i style="background:#64e8af"></i>Green path</span><span>Colors distinguish paths only</span>';update()}
function line(points,color,width=1,alpha=1){ctx.save();ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();ctx.restore()}
function circle(x,y,r,color,fill=true){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx[fill?'fillStyle':'strokeStyle']=color;ctx[fill?'fill':'stroke']()}
function label(t,x,y,color='#95aebd',size=12){ctx.fillStyle=color;ctx.font=size+'px "Microsoft YaHei", sans-serif';ctx.textAlign='center';ctx.fillText(t,x,y)}
function glow(x,y,color,r=4){ctx.save();ctx.shadowBlur=18;ctx.shadowColor=color;circle(x,y,r,color);ctx.restore()}
function beam(points,color,on=true){line(points,color,1,on?.6:.08);if(!on)return;ctx.save();ctx.shadowBlur=14;ctx.shadowColor=color;line(points,color,2,.38);ctx.restore();for(let i=0;i<5;i++){let p=along(points,(clock*.18+i*.2)%1);glow(...p,color,1.6)}}
function along(points,t){let lens=[],sum=0;for(let i=1;i<points.length;i++){let d=Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]);lens.push(d);sum+=d}let d=t*sum;for(let i=0;i<lens.length;i++){if(d<=lens[i]){let v=d/lens[i];return[points[i][0]+(points[i+1][0]-points[i][0])*v,points[i][1]+(points[i+1][1]-points[i][1])*v]}d-=lens[i]}return points.at(-1)}
function hardwareBench(){
  for(let x=42;x<1010;x+=24)for(let y=66;y<584;y+=24){circle(x,y,1.2,'#69808a20')}


}
function mount(x,y,r=22){
  ctx.save();ctx.translate(x,y);ctx.fillStyle='#65738316';ctx.beginPath();ctx.ellipse(12,18,r+14,r*.65,-.35,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#7e8c9c35';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,2,r+13,r+8,-.35,0,Math.PI*2);ctx.stroke();ctx.restore();
}
function surface(points,fill,stroke){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.8;ctx.stroke()}}
function ellipse(x,y,rx,ry,fill,stroke){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}}
function component(x,y,type,name,color='#587a91',rotation=0){
  hitboxes.push({x,y,type,name});mount(x,y,type==='objective'?30:22);ctx.save();ctx.translate(x,y);
  const navy=ctx.createLinearGradient(-25,-30,28,30);navy.addColorStop(0,'#6e94ad');navy.addColorStop(.45,'#557b98');navy.addColorStop(.7,'#264e6c');navy.addColorStop(1,'#173d59');
  const glass=ctx.createLinearGradient(-20,-25,20,30);glass.addColorStop(0,'#ffffff85');glass.addColorStop(.45,color+'55');glass.addColorStop(1,color+'18');
  if(type==='mirror'){
    // Reference-photo silhouette: a thin tilted navy plate, two opposed knobs,
    // and a restrained reflection rather than a thick box-shaped housing.
    const mirrorIndex=mirrors.findIndex(p=>p[0]===x&&p[1]===y);
    const angles=[-.38,.52,-.34,-.19,.59,-.25];
    ctx.rotate((angles[mirrorIndex]??-.38)+(mirrorIndex<aligned?-.08:0));
    const plate=ctx.createLinearGradient(-18,-28,20,30);
    plate.addColorStop(0,'#2b4b67');plate.addColorStop(.25,'#557b98');
    plate.addColorStop(.49,'#6b94b1');plate.addColorStop(.62,'#37698d');
    plate.addColorStop(1,'#173d59');
    surface([[-18,-30],[18,-30],[21,-27],[21,30],[18,32],[-18,30]],'#295978');
    surface([[-18,-30],[18,-30],[18,30],[-18,30]],plate);
    surface([[-18,-30],[18,-30],[18,-27],[-18,-27]],'#6e94ad');
    line([[-17,-26],[-17,26]],'#6a80994a',.8);
    for(const [xx,yy] of [[23,-20],[-23,20]]){
      ctx.fillStyle='#295978';ctx.fillRect(xx<0?-24:17,yy-2,7,4);
      ellipse(xx+1,yy+1,4.2,4.6,'#173d59');
      ellipse(xx,yy,4.2,4.2,'#426a87');
      ellipse(xx-1,yy-1,2.2,1.6,'#6e94ad');
    }
  }else if(type==='laser'){
    // Compact upright source, like the cylindrical laser heads in the reference.
    surface([[-19,-16],[18,-12],[18,23],[0,29],[-19,22]],navy);
    surface([[18,-12],[26,-17],[26,17],[18,23]],'#1b304b');
    ellipse(2,-16,23,7,'#67758a');ellipse(2,-17,18,5,'#243b58');
    ctx.save();ctx.shadowBlur=18;ctx.shadowColor=color;ellipse(2,-20,6,3,color);ctx.restore();
    line([[-16,-10],[-16,19]],'#8b9ab050',1);
  }else if(type==='crystal'){
    ellipse(0,14,27,13,'#97a5b54d');ellipse(0,10,27,13,'#c0cbd277','#8e9eae80');
    ctx.rotate(rotation);
    surface([[-17,-19],[7,-26],[23,-14],[-2,-7]],'#c7e3efba','#9ab6c5');
    surface([[-17,-19],[-2,-7],[-2,22],[-17,10]],'#688eaf88','#829fb8');
    surface([[-2,-7],[23,-14],[23,14],[-2,22]],'#8cb9d08a','#8aadc1');
    line([[-12,-17],[2,-10],[2,15]],'#f6ffffa0',1);
  }else if(type==='filter'||type==='slm'){
    // Transparent optical plates rather than striped electronic modules.
    surface([[-17,-30],[17,-26],[20,27],[-14,30]],glass,color+'95');
    surface([[17,-26],[21,-30],[24,23],[20,27]],color+'28');
    ellipse(1,3,11,6,color+'55');
    line([[-12,-23],[-9,20]],'#ffffffb0',1.3);
    if(type==='slm'){line([[-21,34],[24,34]],'#8396a770',3)}
  }else if(type==='detector'){
    surface([[-18,-22],[14,-25],[26,-15],[-7,-12]],'#7a8a9f');
    surface([[14,-25],[26,-15],[26,23],[14,18]],'#172e4c');
    surface([[-18,-22],[14,-25],[14,18],[-18,22]],navy);
    ellipse(-3,-1,11,15,'#172b44','#7489a3');ellipse(-3,-1,7,10,'#0c1c2e',color+'88');
    ellipse(9,-17,1.5,1.5,'#9ccbb5');
  }else if(type==='objective'){
    const metal=ctx.createLinearGradient(-30,0,30,0);metal.addColorStop(0,'#9bbdd6');metal.addColorStop(.45,'#e7f3fb');metal.addColorStop(1,'#7fa9c7');
    surface([[-29,-35],[29,-35],[12,36],[-12,36]],metal,'#6b94b1');
    ellipse(0,-35,29,9,'#263442','#abb8bf');ellipse(0,-35,23,6,'#152633');
    line([[-22,-9],[22,-9]],'#647e8f90',1);line([[-16,20],[16,20]],'#647e8f90',1);
    ellipse(0,36,12,6,'#b9cbd270','#7f99a8');
  }else{
    surface([[-25,-25],[19,-22],[26,-15],[-18,-18]],'#597b84');
    surface([[19,-22],[26,-15],[26,24],[19,18]],'#163b4b');
    surface([[-25,-25],[19,-22],[19,18],[-25,22]],'#315f82');
    surface([[-19,-19],[13,-17],[13,13],[-19,16]],'#5b8dae77');
    line([[-18,14],[13,-16]],'#9bbdd680',1);
  }
  ctx.restore();if($('labels').checked){
    let primary=name,secondary='';
    if(type==='laser'){primary=name.includes('G')?'Green-path laser':'Blue-path laser';secondary=name.includes('G')?'LASER G / INCIDENT LIGHT':'LASER B / INCIDENT LIGHT'}
    else if(type==='mirror'){primary=name.slice(0,2)+' Mirror';secondary='STEERING MIRROR'+(mirrors.findIndex(p=>p[0]===x&&p[1]===y)<aligned?' / ALIGNED':'')}
    else if(type==='slm'){primary='Spatial light modulator';secondary='SLM / PHASE SHAPING'}
    else if(type==='objective'){primary='High-NA objective';secondary='FOCUSING OBJECTIVE'}
    else if(type==='combiner'){primary='Beam combiner';secondary='BEAM COMBINER'}
    // Place captions in clear spaces beside the optical paths.
    let lx=x,ly=y+49;
    if(type==='slm'){lx=x+116;ly=y+5}
    else if(type==='mirror'){
      const positions=[[205,385],[385,285],[405,170],[575,385],[745,385],[745,270]];
      [lx,ly]=positions[mirrors.findIndex(p=>p[0]===x&&p[1]===y)];
    }else if(type==='combiner'){lx=810;ly=65}
    else if(type==='objective'){lx=840;ly=300}
    label(primary,lx,ly,'#4d7592',13);label(secondary,lx,ly+18,'#9db2c1',9);
  }
}

const mirrors=[[130,340],[305,340],[305,120],[505,340],[670,340],[670,220]];
function calibrate(){if(aligned<6){aligned++;html('metric1',Math.min(aligned,3)+' <small>/ 3</small>');html('metric2',Math.max(0,aligned-3)+' <small>/ 3</small>');update()}}
function drawAuxiliaryOptics(){
  // Low-contrast, non-interactive silhouettes observed in the reference photo.
  // They are visual context, not additional simulated optical stages.
  ctx.save();ctx.globalAlpha=.28;
  const fixtures=[[65,110,0],[185,80,2],[440,98,1],[560,140,0],[730,82,1],[880,72,2],[1000,155,0],[64,260,1],[218,212,2],[395,240,0],[580,267,2],[795,310,1],[1010,365,2],[65,435,1],[270,480,0],[408,540,2],[595,515,0],[740,488,1],[865,555,0],[1000,553,2]];
  for(const [x,y,type] of fixtures){
    ctx.save();ctx.translate(x,y);
    if(type===0){ellipse(3,5,23,22,'#7b87962a');ctx.rotate(-.22);surface([[-13,-16],[15,-14],[15,15],[-13,17]],'#8a95a4');ellipse(-16,8,3,3,'#6c7988');ellipse(17,-8,3,3,'#6c7988')}
    else if(type===1){ellipse(0,19,12,11,'#82909e');ctx.fillStyle='#788695';ctx.fillRect(-3,-30,6,48);line([[-1,-29],[-1,14]],'#abb5bf',1)}
    else{ctx.rotate(-.32);ctx.fillStyle='#9ca8b2';ctx.fillRect(-23,-4,46,8);ellipse(-21,0,5,7,'#6e7e8f');ellipse(21,0,5,7,'#6e7e8f')}
    ctx.restore();
  }
  for(const [x,y] of [[112,188],[362,425],[705,390],[850,190]]){ellipse(x,y,18,18,'#ffffff00','#8e9eaa');ellipse(x,y,7,7,'#ffffff00','#8e9eaa')}
  ctx.strokeStyle='#95a2ad';ctx.lineWidth=1;
  for(const [x,y] of [[200,175],[720,340],[400,455]]){ctx.beginPath();ctx.moveTo(x-40,y-45);ctx.bezierCurveTo(x-85,y+20,x+85,y+30,x+48,y+62);ctx.stroke()}
  ctx.restore();
}
function drawTrap(){
  hardwareBench();drawAuxiliaryOptics();
  const paths=[[[130,620],[130,340],[305,340],[305,120],[810,120]],[[505,620],[505,340],[670,340],[670,220],[810,220],[810,120]]];
  paths.forEach((path,i)=>{const color=i?'#199c69':'#148aca',n=Math.max(0,Math.min(3,aligned-i*3));
    for(let k=1;k<path.length;k++){line([path[k-1],path[k]],color,1,.2);beam([path[k-1],path[k]],color,power()>0&&(k<=n+1||n===3))}
    component(i?505:130,620,'laser',i?'LASER · G':'LASER · B',i?'#64e8af':blue,-Math.PI/2);component(i?505:130,485,'slm','SLM · LENS',i?'#26af79':'#298dca',Math.PI/2);
  });
  mirrors.forEach((p,i)=>{const color=i<3?'#148aca':'#199c69';component(...p,'mirror',(i<3?'B':'G')+(i%3+1)+(i<aligned?' · Aligned':''),color,i<aligned?-.65:.25);
    if(i===aligned){circle(...p,35,color,false);ctx.save();ctx.strokeStyle=color;ctx.lineWidth=3;ctx.beginPath();ctx.arc(p[0],p[1],36,-1.9,.6);ctx.stroke();ctx.restore();label('Click to align',p[0],p[1]-46,color,12)}
  });
  component(810,120,'combiner','COMBINER','#378b8e');beam([[810,120],[945,120],[945,270]],'#359b9d',aligned===6&&power()>0);
  component(945,270,'objective','High-NA objective','#80b6c4');
  ctx.save();ctx.fillStyle='#ebf2f480';ctx.strokeStyle='#718f9f';ctx.beginPath();ctx.ellipse(945,460,65,25,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.ellipse(945,460,53,18,0,0,Math.PI*2);ctx.stroke();ctx.restore();
  if(aligned===6&&power()>0){for(let i=-2;i<=2;i++)line([[945,300],[945+i*16,454]],'#1caa9d',1,.35);ctx.save();ctx.translate(945,456);ctx.rotate(Number($('angle').value)*Math.PI/180);for(let x=-2;x<=2;x++)for(let y=-2;y<=2;y++)glow(x*16,y*7,'#159b8e',2+power()*2);ctx.restore()}
  else label('Awaiting alignment…',945,464,'#69808d',11);
  hitboxes.push({x:945,y:456,type:'array',name:'Atomic tweezer array'});if($('labels').checked){label('Focal plane · Trap array',945,510,'#4e7795',13);label('5 × 5 SITES',945,528,'#9cb1c1',9)};
  for(let i=0;i<6;i++){circle(340+i*44,705,5,i<aligned?'#178dad':'#7b96a64d');if(i<5)line([[347+i*44,705],[377+i*44,705]],'#7b96a64d',2)}
  label(aligned===6?'Both paths aligned · Array ready':'Align '+(aligned+1)+' / 6 · '+(aligned<3?'B':'G')+(aligned%3+1),525,66,'#245769',13);
}

function advance(dt){clock+=dt;if(autoAlign&&power()>0){alignClock+=dt;if(alignClock>1){alignClock=0;calibrate();if(aligned===6)autoAlign=false}}update()}
function draw(now){const dt=Math.min((now-last)/1000,.05);last=now;if(running)advance(dt*($('slow').checked?.3:1));let rect=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(rect.width*dpr)||canvas.height!==Math.round(rect.height*dpr)){canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr)}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,rect.width,rect.height);for(let x=18;x<rect.width;x+=23)for(let y=15;y<rect.height;y+=23)circle(x,y,.7,'#668da328');const worldWidth=1040,worldHeight=740;let scale=Math.min(rect.width/worldWidth,(rect.height-55)/worldHeight),offsetX=(rect.width-worldWidth*scale)/2,offsetY=(rect.height-worldHeight*scale)/2-15;ctx.translate(offsetX,offsetY);ctx.scale(scale,scale);hitboxes=[];drawTrap();canvas._transform={scale,offsetX,offsetY};requestAnimationFrame(draw)}
canvas.addEventListener('click',e=>{const r=canvas.getBoundingClientRect(),t=canvas._transform,x=(e.clientX-r.left-t.offsetX)/t.scale,y=(e.clientY-r.top-t.offsetY)/t.scale;const h=hitboxes.find(p=>Math.hypot(x-p.x,y-p.y)<34);if(!h)return;if(h.type==='mirror'){const index=mirrors.findIndex(p=>p[0]===h.x&&p[1]===h.y);if(index===aligned){calibrate();return}if(index>aligned){text('hint','First align '+(aligned<3?'B':'G')+(aligned%3+1)+' Mirror。');return}}const detail=descriptions[h.type]||descriptions.mirror;text('detailTitle',detail[0]);text('detailText',detail[1]);$('detail').showModal()});
$('power').oninput=update;$('angle').oninput=update;$('play').onclick=()=>{running=!running;update()};$('step').onclick=()=>{running=false;calibrate();update()};$('reset').onclick=reset;$('align').onclick=()=>{autoAlign=aligned<6;running=true;update()};$('closeDetail').onclick=$('detailOkay').onclick=()=>$('detail').close();$('detail').onclick=e=>{if(e.target===$('detail'))$('detail').close()};$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{text('fullscreen','Use your browser fullscreen control')}};document.addEventListener('fullscreenchange',()=>text('fullscreen',document.fullscreenElement?'⛶ Exit fullscreen':'⛶ Fullscreen'));document.addEventListener('keydown',e=>{if(e.code==='Space'&&!['INPUT','BUTTON'].includes(document.activeElement.tagName)&&!$('detail').open){e.preventDefault();running=!running;update()}});reset();requestAnimationFrame(draw);
})(scopedDocument);
})();