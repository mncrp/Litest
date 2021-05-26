let wallName=['background-1.png','background-2.png','background-3.png'];
var wallpaperPath='';

if(wallName.indexOf(node.getBack().background)!=-1){
  wallpaperPath=`../../image/${node.getBack().background}`;
}else{
  wallpaperPath='../../image/background-custom.png';
}

switch (node.getBack().background){
  case 'background-1.png':
    document.querySelector('select').options[0].selected=true;
    break;
  case 'background-2.png':
    document.querySelector('select').options[1].selected=true;
    break;
  case 'background-3.png':
    document.querySelector('select').options[2].selected=true;
    break;
}

document.getElementsByTagName('html')[0].style.setProperty('--background',`url('${wallpaperPath}')`);

document.getElementsByTagName('select')[0].addEventListener('change', (e)=>{
  wallpaperPath=`../../image/${e.target.value}`;
  document.getElementsByTagName('html')[0].style.setProperty('--background',`url(${wallpaperPath})`);
  node.writeBack(e.target.value);
})
