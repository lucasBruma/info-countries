export default function switchTheme(){
    const btnSwitch = document.querySelector('.header__themes');


    btnSwitch.addEventListener('click',()=>{
        const themeIcons = [...document.querySelectorAll('.header__theme-icon')];
        const themeMode = [...document.querySelectorAll('.header__theme-type')]
        document.body.classList.toggle('dark');
        themeIcons[0].classList.toggle('hidden');
        themeIcons[1].classList.toggle('hidden');
        themeMode[0].classList.toggle('hidden');
        themeMode[1].classList.toggle('hidden');
    })
}

