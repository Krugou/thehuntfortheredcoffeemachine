// Get a reference to the body element
const body = document.querySelector('body');
const div = document.createElement('div');
div.className =
	'container mx-auto  bg-white text-black  dark:bg-black dark:text-white h-screen w-screen flex justify-center items-center flex-col';
// Create a new element
const title = document.createElement('h1');
title.textContent = 'the Hunt for the Red Coffee Machine';

// Add Tailwind CSS classes to the title
title.className = 'text-4xl h-full w-full font-bold text-center ';
div.appendChild(title);
// Append the new element to the body
body.appendChild(div);
