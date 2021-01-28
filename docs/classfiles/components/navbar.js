import range from './range.js';


function NavBar() {  
    const navItems = range(10);

    const el = navItems.map(m => {
        const listItem = document.createElement('li')
        listItem.innerText = m;
        return listItem;
    });

    const container = document.createElement('nav');
    container.append(el);
    document.body.append(container);
}

export default NavBar;