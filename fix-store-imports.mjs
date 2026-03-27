import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.nuxt')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.vue') || file.endsWith('.js') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('/media/oem/MyFiles/8_DEVELOPMENT/PrimalTrace-Nuxt-Ssr');
let count = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Need to handle both single and double quotes
  let newContent = content.replace(/from\s+['"]@\/store(\/.*)?['"]/g, (match, suffix) => {
    if(!suffix) suffix = '';
    return 'from "@/stores' + suffix + '"';
  });
  newContent = newContent.replace(/import\(['"]@\/store(\/.*)?['"]\)/g, (match, suffix) => {
    if(!suffix) suffix = '';
    return 'import("@/stores' + suffix + '")';
  });
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    count++;
    console.log('Fixed', file);
  }
});
console.log('Fixed files:', count);
