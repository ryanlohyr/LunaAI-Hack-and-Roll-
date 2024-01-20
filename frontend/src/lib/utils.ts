import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseName = (name: string) => {
  return name
  .split('-') // Split the string by hyphen
  .map((word) => {
    // Capitalize the first letter of each word
    return word.charAt(0).toUpperCase() + word.slice(1);
  })
  .join(' '); // Join the words with a space
}

export function parseHTMLString(htmlString: string) {
  // Create a new DOMParser
  const parser = new DOMParser();

  // Parse the HTML string
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Traverse the DOM tree and extract text content
  const textContents:string[] = [];

  const traverse = (node:any) => {
    if (node.nodeType === Node.TEXT_NODE) {
      textContents.push(node.textContent.trim());
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (const childNode of node.childNodes) {
        traverse(childNode);
      }
    }
  };

  traverse(doc.body);

  const parsed = textContents.map((str) => str.replace('/h2>', '').replace('/h4>', ''))

  // Join the extracted text content with ' > ' in between
  return parsed.join(' > ');
}