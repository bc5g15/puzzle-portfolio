import { debugLightPuzzle } from "./puzzles/lights";
import { debugRotaryLock } from "./puzzles/rotary_lock";

const sections = [
    {
        title: 'Lights',
        content: debugLightPuzzle
    },
    {
        title: 'Rotary Lock',
        content: debugRotaryLock
    }
];

const root = document.createElement('div');
root.style.display = 'flex';

const navbar = document.createElement('div');

navbar.style.display = 'flex';
navbar.style.flexDirection = 'column';
navbar.style.width = 'fit-content';
navbar.style.padding = '1em';

const content = document.createElement('div');
content.innerText = "Click on a puzzle name to display it"

const emptyNode = (node: HTMLElement) => {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

// Build navbar headings
for (let section of sections) {
    const link = document.createElement('div');
    link.innerText = section.title;
    link.style.paddingBottom = '0.5em';
    link.style.cursor = 'pointer';
    link.onclick = () => {
        emptyNode(content);
        content.append(section.content());
    }
    navbar.append(link);
}


document.body.append(root);
root.append(navbar, content);