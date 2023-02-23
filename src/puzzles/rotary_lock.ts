import { buildPipe } from "../utilities/pipe";

const makeSvgElem = (type: string) => document.createElementNS('http://www.w3.org/2000/svg', type)

const shuffle = <T>(array: T[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

const delay = (time: number) => new Promise<void>(resolve => {
    setTimeout(() => resolve(), time)
})

// const display = document.getElementById('display');

export const buildRotaryLock = (count: number, order: number[]) => {

    // const root = document.createElement('div');

    // Build lights
    const lightContainer = makeSvgElem('svg');
    lightContainer.setAttribute('width', '20em');
    lightContainer.setAttribute('height', '20em');
    // displayParent.append(lightContainer);
    let s = lightContainer.style;
    s.outline = '1px solid white';
    s.marginLeft = 'auto';
    s.marginRight = 'auto';
    const lightMap = new Map();
    for (let i = 0; i < count; i++) {
        const elem = makeSvgElem('circle');
        const radius = 3;
        elem.setAttribute('r', `${6}%`);
        s = elem.style;
        s.stroke = 'blue';
        s.fill = 'black';
        s.strokeWidth = '2px';
        const left = (Math.cos((Math.PI * 2 / count) * i) * 40) +50;
        const top = (Math.sin((Math.PI * 2 / count) * i) * 40) +50;
        elem.setAttribute('cx', `${left}%`);
        elem.setAttribute('cy', `${top}%`)
        lightContainer.append(elem);

        // Behaviour
        const setColour = (colour) => {
            elem.style.fill = colour;
        }
        lightMap.set(i, setColour);
    }

    // Add a success circle in the center
    const winCircle = makeSvgElem('circle');
    winCircle.setAttribute('r', '25%');
    winCircle.style.stroke = 'green';
    winCircle.style.strokeWidth = '0.5em';
    winCircle.setAttribute('cx', '50%');
    winCircle.setAttribute('cy', '50%');
    lightContainer.append(winCircle);

    // Build buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    // buttonParent.append(buttonContainer);
    let current = null;
    const active = new Set();

    const pipe = buildPipe<boolean>();
    const pressLogic = async (i) => {

        // Have a delay to show which button was pressed. 
        const setColour = lightMap.get(i);
        setColour('yellow');
        await delay(150);

        if (current === null || i === (current + 1) % count)  {
            current = i;
            setColour('green');
            active.add(i);

            if (active.size === count) {
                // Victory condition
                console.log('Done!')
                winCircle.style.fill = 'green';
                pipe.trigger(true);
            }
            return;
        } 

        // If wrong button
        for (const v of lightMap.values()) {
            v('black');
        }
        current = null;
        active.clear();
    }

    // const buttonList = [];

    for (let i = 0; i < count; i++) {
        const elem = document.createElement('button');
        s = elem.style;
        s.width = '2em';
        s.height = '2em';
        s.margin = '0.5em';

        elem.onclick = () => {
            pressLogic(order[i]);
        };
        buttonContainer.append(elem);
    }

    // const shuffled = shuffle(buttonList);
    // shuffled.forEach(b => buttonContainer.append(b));


    // return root;
    return {
        displayElement: lightContainer,
        buttonElement: buttonContainer,
        pipe
    }
}

// const order = [0,1,2,3,4,5,6,7]
// const newOrder = shuffle(order);
// console.log(newOrder)
// buildPuzzle(8, newOrder, display, document.body);

export const debugRotaryLock = () => {
    const container = document.createElement('div');
    const order = [0,1,2,3,4,5,6,7]
    const newOrder = shuffle(order);
    console.log(newOrder)
    const { displayElement, buttonElement} = buildRotaryLock(8, newOrder);
    container.append(displayElement, buttonElement);
    return container;
}

// document.body.append(buildPuzzle(8));