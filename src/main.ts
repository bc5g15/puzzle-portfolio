
const sections = [
    {
        title: 'Sample A'
    },
    {
        title: 'Sample B'
    }
];

const root = document.createElement('div');
root.style.display = 'flex';

const navbar = document.createElement('div');

navbar.style.display = 'flex';
navbar.style.flexDirection = 'column';
navbar.style.width = 'fit-content';
navbar.style.padding = '1em';

// Build navbar headings
for (let section of sections) {
    const link = document.createElement('div');
    link.innerText = section.title;
    navbar.append(link);
}

const content = document.createElement('div');
content.innerText = "LONG FORM CONTENT GOES HERE SOMEHOW BUT I'M NOT SURE HOW IT WILL WORK WITH THE ABSOLUTE"

document.body.append(root);
root.append(navbar, content);